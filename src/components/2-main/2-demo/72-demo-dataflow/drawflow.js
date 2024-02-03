//https://github.com/jerosoler/Drawflow/blob/master/src/drawflow.js

export class Drawflow {
    constructor(container, render = null, parent = null) {
        this.events = {};
        this.container = container;
        this.canvas = null; // was precanvas
        this.nodeId = 1;
        this.elem_selected = null;
        this.node_selected = null;
        this.drag = false;
        this.reroute = false;
        this.reroute_fix_curvature = false;
        this.curvature = 0.5;
        this.reroute_curvature_start_end = 0.5;
        this.reroute_curvature = 0.5;
        this.reroute_width = 6;
        this.drag_point = false;
        this.editor_selected = false;
        this.connection = false;
        this.connection_ele = null;
        this.connection_selected = null;
        this.canvas_x = 0;
        this.canvas_y = 0;
        this.pos_x = 0;
        this.pos_x_start = 0;
        this.pos_y = 0;
        this.pos_y_start = 0;
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.line_path = 5;
        this.first_click = null;
        this.force_first_input = false;
        this.draggable_inputs = true;
        this.useuuid = false;
        this.parent = parent;

        this.noderegister = {};
        this.render = render;
        this.drawflow = { "drawflow": { "Home": { "data": {} } } };
        // Configurable options
        this.module = 'Home';
        this.editor_mode = 'edit';
        this.zoom = 1;
        this.zoom_max = 1.6;
        this.zoom_min = 0.5;
        this.zoom_value = 0.1;
        this.zoom_last_value = 1;

        // Mobile
        this.evCache = [];
        this.prevDiff = -1;
    }

    start() {
        // console.info("Start Drawflow!!");
        this.container.classList.add("parent-drawflow");
        this.container.tabIndex = 0;
        this.canvas = document.createElement('div');
        this.canvas.classList.add("drawflow");
        this.container.appendChild(this.canvas);

        /* Mouse and Touch Actions */
        this.container.addEventListener('mouseup', this.dragEnd.bind(this));
        this.container.addEventListener('mousemove', this.position.bind(this));
        this.container.addEventListener('mousedown', this.click.bind(this));

        this.container.addEventListener('touchend', this.dragEnd.bind(this));
        this.container.addEventListener('touchmove', this.position.bind(this));
        this.container.addEventListener('touchstart', this.click.bind(this));

        /* Context Menu */
        this.container.addEventListener('contextmenu', this.contextmenu.bind(this));
        /* Delete */
        this.container.addEventListener('keydown', this.key.bind(this));

        /* Zoom Mouse */
        this.container.addEventListener('wheel', this.zoom_enter.bind(this));
        /* Update data Nodes */
        this.container.addEventListener('input', this.updateNodeValue.bind(this));

        this.container.addEventListener('dblclick', this.dblclick.bind(this));
        /* Mobile zoom */
        this.container.onpointerdown = this.pointerdown_handler.bind(this);
        this.container.onpointermove = this.pointermove_handler.bind(this);
        this.container.onpointerup = this.pointerup_handler.bind(this);
        this.container.onpointercancel = this.pointerup_handler.bind(this);
        this.container.onpointerout = this.pointerup_handler.bind(this);
        this.container.onpointerleave = this.pointerup_handler.bind(this);

        this.load();
    }

    /* Mobile zoom */
    pointerdown_handler(event) {
        this.evCache.push(event);
    }

    pointermove_handler(event) {
        for (var i = 0; i < this.evCache.length; i++) {
            if (event.pointerId == this.evCache[i].pointerId) {
                this.evCache[i] = event;
                break;
            }
        }

        if (this.evCache.length == 2) {
            // Calculate the distance between the two pointers
            const curDiff = Math.abs(this.evCache[0].clientX - this.evCache[1].clientX);

            if (this.prevDiff > 100) {
                if (curDiff > this.prevDiff) {
                    // The distance between the two pointers has increased

                    this.zoom_in();
                }
                if (curDiff < this.prevDiff) {
                    // The distance between the two pointers has decreased
                    this.zoom_out();
                }
            }
            this.prevDiff = curDiff;
        }
    }

    pointerup_handler(event) {
        this.remove_event(event);
        if (this.evCache.length < 2) {
            this.prevDiff = -1;
        }
    }

    remove_event(event) {
        // Remove this event from the target's cache
        for (var i = 0; i < this.evCache.length; i++) {
            if (this.evCache[i].pointerId == event.pointerId) {
                this.evCache.splice(i, 1);
                break;
            }
        }
    }
    /* End Mobile Zoom */

    load() {
        const thisModule = this.drawflow.drawflow[this.module];

        for (var key in thisModule.data) {
            this.addNodeImport(thisModule.data[key], this.canvas);
        }

        if (this.reroute) {
            for (var key in thisModule.data) {
                this.addRerouteImport(thisModule.data[key]);
            }
        }

        for (var key in thisModule.data) {
            this.updateConnectionNodes(`node-${key}`);
        }

        const editor = this.drawflow.drawflow;
        let nextNumber = 1;
        Object.keys(editor).forEach(
            (moduleName) => {
                Object.forEach(editor[moduleName].data).map( //tm: use find instead of map
                    (id) => {
                        if (parseInt(id) >= nextNumber) {
                            nextNumber = parseInt(id) + 1;
                        }
                    }
                );
            }
        );
        this.nodeId = nextNumber;
    }

    removeReouteConnectionSelected() {
        this.dispatch('connectionUnselected', true);
        if (this.reroute_fix_curvature) {
            this.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item) => item.classList.remove("selected"));
        }
    }

    click(event) {
        this.dispatch('click', event);

        if (this.editor_mode === 'fixed') {
            //return false;
            event.preventDefault();
            if (event.target.classList[0] === 'parent-drawflow' || event.target.classList[0] === 'drawflow') {
                this.elem_selected = event.target.closest(".parent-drawflow");
            } else {
                return false;
            }
        } else if (this.editor_mode === 'view') {
            if (event.target.closest(".drawflow") != null || event.target.matches('.parent-drawflow')) {
                this.elem_selected = event.target.closest(".parent-drawflow");
                event.preventDefault();
            }
        } else {
            this.first_click = event.target;
            this.elem_selected = event.target;
            if (event.button === 0) {
                this.contextmenuDel();
            }

            if (event.target.closest(".drawflow_content_node") != null) {
                this.elem_selected = event.target.closest(".drawflow_content_node").parentElement;
            }
        }

        switch (this.elem_selected.classList[0]) {
            case 'drawflow-node':
                if (this.node_selected) {
                    this.node_selected.classList.remove("selected");
                    if (this.node_selected != this.elem_selected) {
                        this.dispatch('nodeUnselected', true);
                    }
                }
                if (this.connection_selected) {
                    this.connection_selected.classList.remove("selected");
                    this.removeReouteConnectionSelected();
                    this.connection_selected = null;
                }
                if (this.node_selected != this.elem_selected) {
                    this.dispatch('nodeSelected', this.elem_selected.id.slice(5));
                }
                this.node_selected = this.elem_selected;
                this.node_selected.classList.add("selected");
                if (!this.draggable_inputs) {
                    if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA' && event.target.tagName !== 'SELECT' && event.target.hasAttribute('contenteditable') !== true) {
                        this.drag = true;
                    }
                } else {
                    if (event.target.tagName !== 'SELECT') {
                        this.drag = true;
                    }
                }
                break;
            case 'output':
                this.connection = true;
                if (this.node_selected) {
                    this.node_selected.classList.remove("selected");
                    this.node_selected = null;
                    this.dispatch('nodeUnselected', true);
                }
                if (this.connection_selected) {
                    this.connection_selected.classList.remove("selected");
                    this.removeReouteConnectionSelected();
                    this.connection_selected = null;
                }
                this.drawConnection(event.target);
                break;
            case 'parent-drawflow':
                if (this.node_selected) {
                    this.node_selected.classList.remove("selected");
                    this.node_selected = null;
                    this.dispatch('nodeUnselected', true);
                }
                if (this.connection_selected) {
                    this.connection_selected.classList.remove("selected");
                    this.removeReouteConnectionSelected();
                    this.connection_selected = null;
                }
                this.editor_selected = true;
                break;
            case 'drawflow':
                if (this.node_selected) {
                    this.node_selected.classList.remove("selected");
                    this.node_selected = null;
                    this.dispatch('nodeUnselected', true);
                }
                if (this.connection_selected) {
                    this.connection_selected.classList.remove("selected");
                    this.removeReouteConnectionSelected();
                    this.connection_selected = null;
                }
                this.editor_selected = true;
                break;
            case 'main-path':
                if (this.node_selected) {
                    this.node_selected.classList.remove("selected");
                    this.node_selected = null;
                    this.dispatch('nodeUnselected', true);
                }
                if (this.connection_selected) {
                    this.connection_selected.classList.remove("selected");
                    this.removeReouteConnectionSelected();
                    this.connection_selected = null;
                }
                this.connection_selected = this.elem_selected;
                this.connection_selected.classList.add("selected");
                const listclassConnection = this.connection_selected.parentElement.classList;
                if (listclassConnection.length > 1) {
                    this.dispatch('connectionSelected', { output_id: listclassConnection[2].slice(14), input_id: listclassConnection[1].slice(13), output_class: listclassConnection[3], input_class: listclassConnection[4] });
                    if (this.reroute_fix_curvature) {
                        this.connection_selected.parentElement.querySelectorAll(".main-path").forEach((item, i) => {
                            item.classList.add("selected");
                        });
                    }
                }
                break;
            case 'point':
                this.drag_point = true;
                this.elem_selected.classList.add("selected");
                break;
            case 'drawflow-delete':
                if (this.node_selected) {
                    this.removeNodeId(this.node_selected.id);
                }

                if (this.connection_selected) {
                    this.removeConnection();
                }

                if (this.node_selected) {
                    this.node_selected.classList.remove("selected");
                    this.node_selected = null;
                    this.dispatch('nodeUnselected', true);
                }
                if (this.connection_selected) {
                    this.connection_selected.classList.remove("selected");
                    this.removeReouteConnectionSelected();
                    this.connection_selected = null;
                }

                break;
            default:
        }

        if (event.type === "touchstart") {
            this.pos_x = event.touches[0].clientX;
            this.pos_x_start = event.touches[0].clientX;
            this.pos_y = event.touches[0].clientY;
            this.pos_y_start = event.touches[0].clientY;
            this.mouse_x = event.touches[0].clientX;
            this.mouse_y = event.touches[0].clientY;
        } else {
            this.pos_x = event.clientX;
            this.pos_x_start = event.clientX;
            this.pos_y = event.clientY;
            this.pos_y_start = event.clientY;
        }

        if (['input', 'output', 'main-path'].includes(this.elem_selected.classList[0])) {
            event.preventDefault();
        }

        this.dispatch('clickEnd', event);
    }

    position(event) {
        const isTouch = event.type === "touchmove";

        const e_pos_x = isTouch ? event.touches[0].clientX : event.clientX;
        const e_pos_y = isTouch ? event.touches[0].clientY : event.clientY;

        if (this.connection) {
            this.updateConnection(e_pos_x, e_pos_y);
        }

        if (this.editor_selected) {
            const x = this.canvas_x + (-(this.pos_x - e_pos_x));
            const y = this.canvas_y + (-(this.pos_y - e_pos_y));
            this.dispatch('translate', { x: x, y: y });
            this.canvas.style.transform = `translate(${x}px, ${y}px) scale(${this.zoom})`;
        }

        if (this.drag) {
            event.preventDefault();

            const x = (this.pos_x - e_pos_x) * this.canvas.clientWidth / (this.canvas.clientWidth * this.zoom);
            const y = (this.pos_y - e_pos_y) * this.canvas.clientHeight / (this.canvas.clientHeight * this.zoom);
            this.pos_x = e_pos_x;
            this.pos_y = e_pos_y;

            const elmSelected = this.elem_selected;

            elmSelected.style.left = `${elmSelected.offsetLeft - x}px`;
            elmSelected.style.top = `${elmSelected.offsetTop - y}px`;

            this.drawflow.drawflow[this.module].data[elmSelected.id.slice(5)].pos_x = (elmSelected.offsetLeft - x);
            this.drawflow.drawflow[this.module].data[elmSelected.id.slice(5)].pos_y = (elmSelected.offsetTop - y);

            this.updateConnectionNodes(this.elem_selected.id);
        }

        if (this.drag_point) {
            const canvas = this.canvas;

            // const x = (this.pos_x - e_pos_x) * canvas.clientWidth / (canvas.clientWidth * this.zoom);
            // const y = (this.pos_y - e_pos_y) * canvas.clientHeight / (canvas.clientHeight * this.zoom);

            this.pos_x = e_pos_x;
            this.pos_y = e_pos_y;

            const x = this.pos_x * (canvas.clientWidth / (canvas.clientWidth * this.zoom)) - (canvas.getBoundingClientRect().x * (canvas.clientWidth / (canvas.clientWidth * this.zoom)));
            const y = this.pos_y * (canvas.clientHeight / (canvas.clientHeight * this.zoom)) - (canvas.getBoundingClientRect().y * (canvas.clientHeight / (canvas.clientHeight * this.zoom)));

            this.elem_selected.setAttributeNS(null, 'cx', x);
            this.elem_selected.setAttributeNS(null, 'cy', y);

            const nodeUpdate = this.elem_selected.parentElement.classList[2].slice(9);
            const nodeUpdateIn = this.elem_selected.parentElement.classList[1].slice(13);
            const classOutput = this.elem_selected.parentElement.classList[3];
            const classInput = this.elem_selected.parentElement.classList[4];

            let numberPointPosition = Array.from(this.elem_selected.parentElement.children).indexOf(this.elem_selected) - 1;

            if (this.reroute_fix_curvature) {
                const numberMainPath = this.elem_selected.parentElement.querySelectorAll(".main-path").length - 1;
                numberPointPosition -= numberMainPath;
                if (numberPointPosition < 0) {
                    numberPointPosition = 0;
                }
            }

            const nodeId = nodeUpdate.slice(5);
            const connections = this.drawflow.drawflow[this.module].data[nodeId].outputs[classOutput].connections;
            const searchConnection = connections.findIndex((item) => item.node === nodeUpdateIn && item.output === classInput);

            connections[searchConnection].points[numberPointPosition] = { pos_x: x, pos_y: y };

            const parentSelected = this.elem_selected.parentElement.classList[2].slice(9);

            this.updateConnectionNodes(parentSelected);
        }

        if (isTouch) {
            this.mouse_x = e_pos_x;
            this.mouse_y = e_pos_y;
        }

        this.dispatch('mouseMove', { x: e_pos_x, y: e_pos_y });
    }

    dragEnd(e) {
        const isTouch = e.type === "touchend";

        const e_pos_x = isTouch ? this.mouse_x : e.clientX;
        const e_pos_y = isTouch ? this.mouse_y : e.clientY;
        const elemLast = isTouch ? document.elementFromPoint(e_pos_x, e_pos_y) : e.target;

        if (this.drag) {
            if (this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
                this.dispatch('nodeMoved', this.elem_selected.id.slice(5));
            }
        }

        if (this.drag_point) {
            this.elem_selected.classList.remove("selected");
            if (this.pos_x_start != e_pos_x || this.pos_y_start != e_pos_y) {
                this.dispatch('rerouteMoved', this.elem_selected.parentElement.classList[2].slice(14));
            }
        }

        if (this.editor_selected) {
            this.canvas_x = this.canvas_x + (-(this.pos_x - e_pos_x));
            this.canvas_y = this.canvas_y + (-(this.pos_y - e_pos_y));
            this.editor_selected = false;
        }

        if (this.connection === true) {
            if (elemLast.classList[0] === 'input' || (this.force_first_input && (elemLast.closest(".drawflow_content_node") != null || elemLast.classList[0] === 'drawflow-node'))) {

                let input_id;
                let input_class;
                if (this.force_first_input && (elemLast.closest(".drawflow_content_node") != null || elemLast.classList[0] === 'drawflow-node')) {
                    const closest = elemLast.closest(".drawflow_content_node");

                    input_id = closest ? closest.parentElement.id : elemLast.id;
                    input_class = Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0 ? false : "input_1";
                } else {
                    // Fix connection;
                    input_id = elemLast.parentElement.parentElement.id;
                    input_class = elemLast.classList[1];
                }

                const output_id = this.elem_selected.parentElement.parentElement.id;
                const output_class = this.elem_selected.classList[1];

                if (output_id !== input_id && input_class !== false) {

                    if (this.container.querySelectorAll(`.connection.node_in_${input_id}.node_out_${output_id}.${output_class}.${input_class}`).length === 0) {
                        // Conection no exist save connection
                        this.connection_ele.classList.add(`node_in_${input_id}`);
                        this.connection_ele.classList.add(`node_out_${output_id}`);
                        this.connection_ele.classList.add(output_class);
                        this.connection_ele.classList.add(input_class);
                        const id_input = input_id.slice(5);
                        const id_output = output_id.slice(5);

                        this.drawflow.drawflow[this.module].data[id_output].outputs[output_class].connections.push({ "node": id_input, "output": input_class });
                        this.drawflow.drawflow[this.module].data[id_input].inputs[input_class].connections.push({ "node": id_output, "input": output_class });

                        this.updateConnectionNodes(`node-${id_output}`);
                        this.updateConnectionNodes(`node-${id_input}`);

                        this.dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class: output_class, input_class: input_class });
                    } else {
                        this.dispatch('connectionCancel', true);
                        this.connection_ele.remove();
                    }

                    this.connection_ele = null;
                } else {
                    // Connection exists Remove Connection;
                    this.dispatch('connectionCancel', true);
                    this.connection_ele.remove();
                    this.connection_ele = null;
                }
            } else {
                // Remove Connection;
                this.dispatch('connectionCancel', true);
                this.connection_ele.remove();
                this.connection_ele = null;
            }
        }

        this.drag = false;
        this.drag_point = false;
        this.connection = false;
        this.elem_selected = null;
        this.editor_selected = false;

        this.dispatch('mouseUp', e);
    }

    contextmenu(e) {
        this.dispatch('contextmenu', e);
        e.preventDefault();
        if (this.editor_mode === 'fixed' || this.editor_mode === 'view') {
            return false;
        }

        if (this.canvas.getElementsByClassName("drawflow-delete").length) {
            this.canvas.getElementsByClassName("drawflow-delete")[0].remove();
        }

        if (this.node_selected || this.connection_selected) {
            const divDeleteBox = document.createElement('div');
            divDeleteBox.classList.add("drawflow-delete");
            divDeleteBox.innerHTML = "✕";

            if (this.node_selected) {
                this.node_selected.appendChild(divDeleteBox);
            }

            if (this.connection_selected && (this.connection_selected.parentElement.classList.length > 1)) {
                const canvas = this.canvas;
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX * (canvas.clientWidth / (canvas.clientWidth * this.zoom)) - (rect.x * (canvas.clientWidth / (canvas.clientWidth * this.zoom)));
                const y = e.clientY * (canvas.clientHeight / (canvas.clientHeight * this.zoom)) - (rect.y * (canvas.clientHeight / (canvas.clientHeight * this.zoom)));

                divDeleteBox.style.left = `${x}px`;
                divDeleteBox.style.top = `${y}px`;
                this.canvas.appendChild(divDeleteBox);
            }
        }
    }

    contextmenuDel() {
        if (this.canvas.getElementsByClassName("drawflow-delete").length) {
            this.canvas.getElementsByClassName("drawflow-delete")[0].remove();
        };
    }

    key(e) {
        this.dispatch('keydown', e);
        if (this.editor_mode === 'fixed' || this.editor_mode === 'view') {
            return false;
        }

        if (e.key === 'Delete' || (e.key === 'Backspace' && e.metaKey)) {
            if (this.node_selected) {
                if (this.first_click.tagName !== 'INPUT' && this.first_click.tagName !== 'TEXTAREA' && this.first_click.hasAttribute('contenteditable') !== true) {
                    this.removeNodeId(this.node_selected.id);
                }
            }
            if (this.connection_selected != null) {
                this.removeConnection();
            }
        }
    }

    zoom_enter(event, delta) {
        if (event.ctrlKey) {
            event.preventDefault();
            if (event.deltaY > 0) {
                this.zoom_out();
            } else {
                this.zoom_in();
            }
        }
    }
    zoom_refresh() {
        this.dispatch('zoom', this.zoom);
        this.canvas_x = (this.canvas_x / this.zoom_last_value) * this.zoom;
        this.canvas_y = (this.canvas_y / this.zoom_last_value) * this.zoom;
        this.zoom_last_value = this.zoom;
        this.canvas.style.transform = "translate(" + this.canvas_x + "px, " + this.canvas_y + "px) scale(" + this.zoom + ")";
    }
    zoom_in() {
        if (this.zoom < this.zoom_max) {
            this.zoom += this.zoom_value;
            this.zoom_refresh();
        }
    }
    zoom_out() {
        if (this.zoom > this.zoom_min) {
            this.zoom -= this.zoom_value;
            this.zoom_refresh();
        }
    }
    zoom_reset() {
        if (this.zoom != 1) {
            this.zoom = 1;
            this.zoom_refresh();
        }
    }

    createCurvature(startX, startY, endX, endY, curvatureValue, type) {
        switch (type) {
            case 'open': {
                const dir = startX >= endX ? -1 : 1;
                const hx1 = startX + Math.abs(endX - startX) * curvatureValue;
                const hx2 = endX - Math.abs(endX - startX) * (curvatureValue * dir);
                return ` M ${startX} ${startY} C ${hx1} ${startY} ${hx2} ${endY} ${endX}  ${endY}`;
            }
            case 'close': {
                const dir = startX >= endX ? -1 : 1;
                const hx1 = startX + Math.abs(endX - startX) * (curvatureValue * dir);
                const hx2 = endX - Math.abs(endX - startX) * curvatureValue;
                return ` M ${startX} ${startY} C ${hx1} ${startY} ${hx2} ${endY} ${endX}  ${endY}`;
            }
            case 'other': {
                const dir = startX >= endX ? -1 : 1;
                const hx1 = startX + Math.abs(endX - startX) * (curvatureValue * dir);
                const hx2 = endX - Math.abs(endX - startX) * (curvatureValue * dir);
                return ` M ${startX} ${startY} C ${hx1} ${startY} ${hx2} ${endY} ${endX}  ${endY}`;
            }
            default: {
                let hx1 = startX + Math.abs(endX - startX) * curvatureValue;
                let hx2 = endX - Math.abs(endX - startX) * curvatureValue;
                return ` M ${startX} ${startY} C ${hx1} ${startY} ${hx2} ${endY} ${endX}  ${endY}`;
            }
        }
    }

    drawConnection(ele) {
        const svgConnection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
        this.connection_ele = svgConnection;

        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
        svgPath.classList.add('main-path');
        svgPath.setAttributeNS(null, 'd', '');
        svgConnection.classList.add("connection");
        svgConnection.appendChild(svgPath);
        this.canvas.appendChild(svgConnection);

        const outputId = ele.parentElement.parentElement.id.slice(5);
        const outputClass = ele.classList[1];
        this.dispatch('connectionStart', { output_id: outputId, output_class: outputClass });
    }

    updateConnection(eX, eY) {
        const zoom = this.zoom;
        const canvas = this.canvas;
        const rect = canvas.getBoundingClientRect();
        const rectElm = this.elem_selected.getBoundingClientRect();

        let precanvasWitdhZoom = canvas.clientWidth / (canvas.clientWidth * zoom) || 0;
        let precanvasHeightZoom = canvas.clientHeight / (canvas.clientHeight * zoom) || 0;

        const svgPath = this.connection_ele.children[0];

        const startX = this.elem_selected.offsetWidth / 2 + (rectElm.x - rect.x) * precanvasWitdhZoom;
        const startY = this.elem_selected.offsetHeight / 2 + (rectElm.y - rect.y) * precanvasHeightZoom;
        const endX = eX * (canvas.clientWidth / (canvas.clientWidth * this.zoom)) - (rect.x * (canvas.clientWidth / (canvas.clientWidth * this.zoom)));
        const endY = eY * (canvas.clientHeight / (canvas.clientHeight * this.zoom)) - (rect.y * (canvas.clientHeight / (canvas.clientHeight * this.zoom)));

        const curvature = this.curvature;
        const lineCurve = this.createCurvature(startX, startY, endX, endY, curvature, 'openclose');
        svgPath.setAttributeNS(null, 'd', lineCurve);
    }

    addConnection(idOutput, idInput, classOutput, classInput) {
        const nodeOneModule = this.getModuleNameFromNodeId(idOutput);
        const nodeTwoModule = this.getModuleNameFromNodeId(idInput);
        if (nodeOneModule !== nodeTwoModule) {
            return;
        }

        const dataNode = this.getNodeFromId(idOutput);
        let exist = false;
        for (var checkOutput in dataNode.outputs[classOutput].connections) {
            const connectionSearch = dataNode.outputs[classOutput].connections[checkOutput];
            if (connectionSearch.node == idInput && connectionSearch.output == classInput) {
                exist = true;
            }
        }

        // Check connection exist
        if (!exist) {
            //Create Connection
            this.drawflow.drawflow[nodeOneModule].data[idOutput].outputs[classOutput].connections.push({ "node": idInput.toString(), "output": classInput });
            this.drawflow.drawflow[nodeOneModule].data[idInput].inputs[classInput].connections.push({ "node": idOutput.toString(), "input": classOutput });

            if (this.module === nodeOneModule) {
                //Draw connection
                const svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
                svgPath.classList.add("main-path");
                svgPath.setAttributeNS(null, 'd', '');

                const svgConnection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                svgConnection.classList.add("connection");
                svgConnection.classList.add(`node_in_node-${idInput}`);
                svgConnection.classList.add(`node_out_node-${idOutput}`);
                svgConnection.classList.add(classOutput);
                svgConnection.classList.add(classInput);
                svgConnection.appendChild(svgPath);
                this.canvas.appendChild(svgConnection);

                this.updateConnectionNodes(`node-${idOutput}`);
                this.updateConnectionNodes(`node-${idInput}`);
            }

            this.dispatch('connectionCreated', { output_id: idOutput, input_id: idInput, output_class: classOutput, input_class: classInput });
        }
    }

    getStartEnd({ elmA, elmB, addHalfA, addHalfB, rerouteWidthBeg, rerouteWidthEnd }) {
        const precanvasWitdhZoom = canvas.clientWidth / (this.canvas.clientWidth * this.zoom) || 0;
        const precanvasHeightZoom = canvas.clientHeight / (this.canvas.clientHeight * this.zoom) || 0;

        const rect = this.canvas.getBoundingClientRect();
        const rectElmA = elmA.getBoundingClientRect();
        const rectElmB = elmB.getBoundingClientRect();

        const endX = (addHalfA ? elmA.offsetWidth / 2 : 0) + (rectElmA.x - rect.x) * precanvasWitdhZoom;
        const endY = (addHalfA ? elmA.offsetHeight / 2 : 0) + (rectElmA.y - rect.y) * precanvasHeightZoom;

        const begX = (addHalfB ? elmB.offsetWidth / 2 : 0) + (rectElmB.x - rect.x) * precanvasWitdhZoom;
        const begY = (addHalfB ? elmB.offsetHeight / 2 : 0) + (rectElmB.y - rect.y) * precanvasHeightZoom;

        return [begX + rerouteWidthBeg, begY + rerouteWidthBeg, endX + rerouteWidthEnd, endY + rerouteWidthEnd];
    }

    updateConnectionNodes(id) {
        const idSearch = `node_in_${id}`;
        const idSearchOut = `node_out_${id}`;

        //var line_path = this.line_path / 2; //tm: not used
        const container = this.container;
        const canvas = this.canvas;
        const curvature = this.curvature;

        const createCurvature = this.createCurvature;
        const reroute_curvature = this.reroute_curvature;
        const reroute_curvature_start_end = this.reroute_curvature_start_end;
        const reroute_fix_curvature = this.reroute_fix_curvature;
        const rerouteWidth = this.reroute_width;

        const zoom = this.zoom;
        let precanvasWitdhZoom = canvas.clientWidth / (canvas.clientWidth * zoom) || 0;
        let precanvasHeightZoom = canvas.clientHeight / (canvas.clientHeight * zoom) || 0;

        const elemsOut = container.querySelectorAll(`.${idSearchOut}`);
        Object.keys(elemsOut).forEach(
            (key) => {
                if (elemsOut[key].querySelector('.point') === null) {
                    const canvasRect = canvas.getBoundingClientRect();

                    const elemtsearchId_out = container.querySelector(`#${id}`);

                    const id_search = elemsOut[key].classList[1].replace('node_in_', '');
                    const elemtsearchId = container.querySelector(`#${id_search}`);

                    const elemtsearch = elemtsearchId.querySelectorAll('.' + elemsOut[key].classList[4])[0];
                    const elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + elemsOut[key].classList[3])[0];

                    const lineCurve = createCurvature(...this.getStartEnd({ elmA: elemtsearch, elmB: elemtsearchOut, addHalfA: true, addHalfB: true, rerouteWidthBeg: 0, rerouteWidthEnd: 0 }), curvature, 'openclose');
                    elemsOut[key].children[0].setAttributeNS(null, 'd', lineCurve);
                } else {
                    const points = elemsOut[key].querySelectorAll('.point');
                    let linecurve = '';
                    const reoute_fix = [];

                    points.forEach(
                        (pointElm, idx) => {
                            if (idx === 0 && ((points.length - 1) === 0)) {
                                const elmSearch = pointElm;
                                const elmSearchOut = elmSearchIdOut.querySelectorAll('.' + pointElm.parentElement.classList[3])[0];

                                const [bexX1, begY1, endX1, endY1] = this.getStartEnd({ elmA: elmSearch, elmB: elmSearchOut, addHalfA: false, addHalfB: true, rerouteWidthBeg: 0, rerouteWidthEnd: rerouteWidth });
                                const lineCurveSearchOpen = createCurvature(bexX1, begY1, endX1, endY1, reroute_curvature_start_end, 'open');
                                linecurve += lineCurveSearchOpen;
                                reoute_fix.push(lineCurveSearchOpen);

                                //const elemtsearchId_out = pointElm; //tm: not used
                                const id_search = pointElm.parentElement.classList[1].replace('node_in_', '');
                                const elemtsearchId = container.querySelector(`#${id_search}`);
                                //const elemtsearch = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[4])[0]; //tm: not used

                                var elemtsearchIn = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[4])[0];
                                const elmSearchIdOut = container.querySelector(`#${id}`);

                                const [begX, begY, endX, endY] = this.getStartEnd({ elmA: elemtsearchIn, elmB: elmSearchIdOut, addHalfA: true, addHalfB: false, rerouteWidthBeg: rerouteWidth, rerouteWidthEnd: 0 });
                                const lineCurveSearchClose = createCurvature(begX, begY, endX, endY, reroute_curvature_start_end, 'close');
                                linecurve += lineCurveSearchClose;
                                reoute_fix.push(lineCurveSearchClose);
                            } else if (idx === 0) {
                                const elemtsearch1 = pointElm;
                                const elemtsearchId_out = container.querySelector(`#${id}`);
                                const elmSearchOut = elemtsearchId_out.querySelectorAll('.' + pointElm.parentElement.classList[3])[0];

                                const [bexX1, begY1, endX1, endY1] = this.getStartEnd({ elmA: elemtsearch1, elmB: elmSearchOut, addHalfA: false, addHalfB: true, rerouteWidthBeg: 0, rerouteWidthEnd: rerouteWidth });
                                const lineCurveSearch1 = createCurvature(bexX1, begY1, endX1, endY1, reroute_curvature_start_end, 'open');
                                linecurve += lineCurveSearch1;
                                reoute_fix.push(lineCurveSearch1);

                                // SECOND
                                const elmSearchIdOut2 = pointElm;
                                const elmSearch2 = points[idx + 1];

                                const [begX, begY, endX, endY] = this.getStartEnd({ elmA: elmSearch2, elmB: elmSearchIdOut2, addHalfA: false, addHalfB: false, rerouteWidthBeg: rerouteWidth, rerouteWidthEnd: rerouteWidth });
                                const lineCurveSearch2 = createCurvature(begX, begY, endX, endY, reroute_curvature, 'other');
                                linecurve += lineCurveSearch2;
                                reoute_fix.push(lineCurveSearch2);
                            } else if (idx === (points.length - 1)) {
                                const elemtsearchId_out = pointElm;
                                const id_search = pointElm.parentElement.classList[1].replace('node_in_', '');
                                const elemtsearchId = container.querySelector(`#${id_search}`);
                                //const elemtsearch = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[4])[0]; //tm: not used
                                const elemtsearchIn = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[4])[0];

                                const [begX, begY, endX, endY] = this.getStartEnd({ elmA: elemtsearchIn, elmB: elemtsearchId_out, addHalfA: true, addHalfB: false, rerouteWidthBeg: rerouteWidth, rerouteWidthEnd: 0 });
                                const lineCurveSearch = createCurvature(begX, begY, endX, endY, reroute_curvature_start_end, 'close');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else {
                                const elemtsearchId_out = pointElm;
                                const elemtsearch = points[idx + 1];

                                const [begX, begY, endX, endY] = this.getStartEnd({ elmA: elemtsearch, elmB: elemtsearchId_out, addHalfA: false, addHalfB: false, rerouteWidthBeg: rerouteWidth, rerouteWidthEnd: rerouteWidth });
                                const lineCurveSearch = createCurvature(begX, begY, endX, endY, reroute_curvature, 'other');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            }
                        }
                    );

                    if (reroute_fix_curvature) {
                        reoute_fix.forEach((itemPath, idx) => elemsOut[key].children[idx].setAttributeNS(null, 'd', itemPath));
                    } else {
                        elemsOut[key].children[0].setAttributeNS(null, 'd', linecurve);
                    }
                }
            }
        );

        const elemsIn = container.querySelectorAll(`.${idSearch}`);
        Object.keys(elemsIn).forEach(
            (item) => {
                if (elemsIn[item].querySelector('.point') === null) {
                    const canvasRect = canvas.getBoundingClientRect();

                    const id_search = elemsIn[item].classList[2].replace('node_out_', '');
                    const elemtsearchId = container.querySelector(`#${id_search}`);
                    const elemtsearch = elemtsearchId.querySelectorAll('.' + elemsIn[item].classList[3])[0];

                    let elemtsearchId_in = container.querySelector(`#${id}`);
                    elemtsearchId_in = elemtsearchId_in.querySelectorAll('.' + elemsIn[item].classList[4])[0];

                    const line_x = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom;
                    const line_y = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom;
                    const x = elemtsearchId_in.offsetWidth / 2 + (elemtsearchId_in.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom;
                    const y = elemtsearchId_in.offsetHeight / 2 + (elemtsearchId_in.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom;

                    const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
                    elemsIn[item].children[0].setAttributeNS(null, 'd', lineCurve);
                } else {
                    const points = elemsIn[item].querySelectorAll('.point');
                    let lineCurveStr = '';
                    const reoute_fix = [];
                    points.forEach(
                        (pointElm, idx) => {
                            const canvasRect = canvas.getBoundingClientRect();

                            if (idx === 0 && ((points.length - 1) === 0)) {
                                const elemtsearchId_out1 = container.querySelector(`#${id}`);

                                const elemtsearch1 = pointElm;
                                const elemtsearchIn = elemtsearchId_out1.querySelectorAll('.' + pointElm.parentElement.classList[4])[0];

                                const eX1 = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom;
                                const eY1 = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom;
                                const line_x1 = (elemtsearch1.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const line_y1 = (elemtsearch1.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;

                                const lineCurveSearch1 = createCurvature(line_x1, line_y1, eX1, eY1, reroute_curvature_start_end, 'close');
                                lineCurveStr += lineCurveSearch1;
                                reoute_fix.push(lineCurveSearch1);

                                const elemtsearchId_out2 = pointElm;
                                const idSearch = pointElm.parentElement.classList[2].replace('node_out_', '');
                                const elemtsearchId = container.querySelector(`#${idSearch}`);
                                //const elemtsearch = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[3])[0]; //tm: not used

                                const elemtsearchOut = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[3])[0];

                                const eX = (elemtsearchId_out2.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const eY = (elemtsearchId_out2.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;
                                const line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom;
                                const line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom;

                                const lineCurveSearch2 = createCurvature(line_x, line_y, eX, eY, reroute_curvature_start_end, 'open');
                                lineCurveStr += lineCurveSearch2;
                                reoute_fix.push(lineCurveSearch2);
                            } else if (idx === 0) {
                                // FIRST
                                const elemtsearchId_out1 = pointElm;
                                const idSearch = pointElm.parentElement.classList[2].replace('node_out_', '');
                                const elemtsearchId = container.querySelector(`#${idSearch}`);
                                //const elemtsearch = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[3])[0]; //tm: not used

                                const elemtsearchOut = elemtsearchId.querySelectorAll('.' + pointElm.parentElement.classList[3])[0];

                                const eX1 = (elemtsearchId_out1.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const eY1 = (elemtsearchId_out1.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;
                                const line_x1 = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom;
                                const line_y1 = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom;

                                const lineCurveSearch1 = createCurvature(line_x1, line_y1, eX1, eY1, reroute_curvature_start_end, 'open');
                                lineCurveStr += lineCurveSearch1;
                                reoute_fix.push(lineCurveSearch1);

                                // SECOND
                                const elemtsearchId_out2 = pointElm;
                                const elemtsearch = points[idx + 1];

                                const eX2 = (elemtsearch.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const eY2 = (elemtsearch.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;
                                const line_x2 = (elemtsearchId_out2.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const line_y2 = (elemtsearchId_out2.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;

                                const lineCurveSearch2 = createCurvature(line_x2, line_y2, eX2, eY2, reroute_curvature, 'other');
                                lineCurveStr += lineCurveSearch2;
                                reoute_fix.push(lineCurveSearch2);
                            } else if (idx === (points.length - 1)) {
                                const elemtsearchId_out = pointElm;

                                const idSearch = pointElm.parentElement.classList[1].replace('node_in_', '');
                                const elemtsearchId = container.querySelector(`#${idSearch}`);
                                //const elemtsearch = elemtsearchId.querySelectorAll(`.${pointElm.parentElement.classList[4]}`)[0]; //tm: not used

                                const elemtsearchIn = elemtsearchId.querySelectorAll(`.${pointElm.parentElement.classList[4]}`)[0];

                                const eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom;
                                const eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom;
                                const line_x = (elemtsearchId_out.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const line_y = (elemtsearchId_out.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;

                                const lineCurveSearch = createCurvature(line_x, line_y, eX, eY, reroute_curvature_start_end, 'close');
                                lineCurveStr += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else {
                                const elemtsearchId_out = pointElm;

                                const elemtsearch = points[idx + 1];

                                const eX = (elemtsearch.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const eY = (elemtsearch.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;
                                const line_x = (elemtsearchId_out.getBoundingClientRect().x - canvasRect.x) * precanvasWitdhZoom + rerouteWidth;
                                const line_y = (elemtsearchId_out.getBoundingClientRect().y - canvasRect.y) * precanvasHeightZoom + rerouteWidth;

                                const lineCurveSearch = createCurvature(line_x, line_y, eX, eY, reroute_curvature, 'other');
                                lineCurveStr += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            }
                        }
                    );

                    if (reroute_fix_curvature) {
                        reoute_fix.forEach((itempath, idx) => elemsIn[item].children[idx].setAttributeNS(null, 'd', itempath));
                    } else {
                        elemsIn[item].children[0].setAttributeNS(null, 'd', lineCurveStr);
                    }
                }
            }
        );
    }

    dblclick(e) {
        if (this.connection_selected != null && this.reroute) {
            this.createReroutePoint(this.connection_selected);
        }

        if (e.target.classList[0] === 'point') {
            this.removeReroutePoint(e.target);
        }
    }

    createReroutePoint(elm) {
        this.connection_selected.classList.remove("selected");

        const nodeUpdate = this.connection_selected.parentElement.classList[2].slice(9);
        const nodeUpdateIn = this.connection_selected.parentElement.classList[1].slice(13);
        const output_class = this.connection_selected.parentElement.classList[3];
        const input_class = this.connection_selected.parentElement.classList[4];
        this.connection_selected = null;

        const canvas = this.canvas;
        const rect = canvas.getBoundingClientRect();

        const svgDot = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        svgDot.classList.add("point");

        const pos_x = this.pos_x * (canvas.clientWidth / (canvas.clientWidth * this.zoom)) - (rect.x * (canvas.clientWidth / (canvas.clientWidth * this.zoom)));
        const pos_y = this.pos_y * (canvas.clientHeight / (canvas.clientHeight * this.zoom)) - (rect.y * (canvas.clientHeight / (canvas.clientHeight * this.zoom)));
        svgDot.setAttributeNS(null, 'cx', pos_x);
        svgDot.setAttributeNS(null, 'cy', pos_y);
        svgDot.setAttributeNS(null, 'r', this.reroute_width);

        let position_add_array_point = 0;

        if (this.reroute_fix_curvature) {
            const numberPoints = elm.parentElement.querySelectorAll(".main-path").length;

            const svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
            svgPath.classList.add("main-path");
            svgPath.setAttributeNS(null, 'd', '');
            elm.parentElement.insertBefore(svgPath, elm.parentElement.children[numberPoints]);

            if (numberPoints === 1) {
                elm.parentElement.appendChild(svgDot);
            } else {
                const search_point = Array.from(elm.parentElement.children).indexOf(elm);
                position_add_array_point = search_point;
                elm.parentElement.insertBefore(svgDot, elm.parentElement.children[search_point + numberPoints + 1]);
            }
        } else {
            elm.parentElement.appendChild(svgDot);
        }

        const nodeId = nodeUpdate.slice(5);
        const connections = this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections;
        const searchConnection = connections.findIndex((item) => item.node === nodeUpdateIn && item.output === input_class);

        const connectionsToUpdate = connections[searchConnection];
        if (!connectionsToUpdate.points) {
            connectionsToUpdate.points = [];
        }

        if (this.reroute_fix_curvature) {
            if (position_add_array_point > 0 || !connectionsToUpdate.points?.length) {
                connectionsToUpdate.points.splice(position_add_array_point, 0, { pos_x: pos_x, pos_y: pos_y });
            } else {
                connectionsToUpdate.points.push({ pos_x: pos_x, pos_y: pos_y });
            }
            elm.parentElement.querySelectorAll(".main-path").forEach((item) => item.classList.remove("selected"));
        } else {
            connectionsToUpdate.points.push({ pos_x: pos_x, pos_y: pos_y });
        }

        this.dispatch('addReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    removeReroutePoint(elm) {
        const nodeUpdate = elm.parentElement.classList[2].slice(9);
        const nodeUpdateIn = elm.parentElement.classList[1].slice(13);
        const output_class = elm.parentElement.classList[3];
        const input_class = elm.parentElement.classList[4];

        let numberPointPosition = Array.from(elm.parentElement.children).indexOf(elm);

        const nodeId = nodeUpdate.slice(5);
        const connections = this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections;
        const searchConnection = connections.findIndex((item) => item.node === nodeUpdateIn && item.output === input_class);

        if (this.reroute_fix_curvature) {
            const numberMainPath = elm.parentElement.querySelectorAll(".main-path").length;
            elm.parentElement.children[numberMainPath - 1].remove();
            numberPointPosition -= numberMainPath;
            if (numberPointPosition < 0) {
                numberPointPosition = 0;
            }
        } else {
            numberPointPosition--;
        }
        connections[searchConnection].points.splice(numberPointPosition, 1);

        elm.remove();
        this.dispatch('removeReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    registerNode(name, html, props = null, options = null) {
        this.noderegister[name] = { html: html, props: props, options: options };
    }

    getNodeFromId(id) {
        const moduleName = this.getModuleNameFromNodeId(id);
        return JSON.parse(JSON.stringify(this.drawflow.drawflow[moduleName].data[id]));
    }
    getNodesFromName(name) {
        const nodes = [];
        const editor = this.drawflow.drawflow;
        Object.keys(editor).forEach(
            (moduleName) => {
                for (var node in editor[moduleName].data) {
                    if (editor[moduleName].data[node].name == name) {
                        nodes.push(editor[moduleName].data[node].id);
                    }
                }
            }
        );
        return nodes;
    }

    addNode(name, num_in, num_out, ele_pos_x, ele_pos_y, classOverride, data, html, typenode = false) {
        const newNodeId = this.useuuid ? getUuid() : this.nodeId;

        const divParent = document.createElement('div');
        divParent.classList.add("parent-node");

        const divNode = document.createElement('div');
        divNode.innerHTML = "";
        divNode.setAttribute("id", `node-${newNodeId}`);
        divNode.classList.add("drawflow-node");
        if (classOverride) {
            divNode.classList.add(...classOverride.split(' '));
        }

        const divInputs = document.createElement('div');
        divInputs.classList.add("inputs");

        const divOutputs = document.createElement('div');
        divOutputs.classList.add("outputs");

        const jsonInputs = {};
        for (var x = 0; x < num_in; x++) {
            const elm = document.createElement('div');
            elm.classList.add('input', `input_${x + 1}`);
            jsonInputs[`input_${x + 1}`] = { "connections": [] };
            divInputs.appendChild(elm);
        }

        const jsonOutputs = {};
        for (var x = 0; x < num_out; x++) {
            const elm = document.createElement('div');
            elm.classList.add("output", `output_${x + 1}`);
            jsonOutputs[`output_${x + 1}`] = { "connections": [] };
            divOutputs.appendChild(elm);
        }

        const divContent = document.createElement('div');
        divContent.classList.add("drawflow_content_node");

        if (typenode === false) {
            divContent.innerHTML = html;
        } else if (typenode === true) {
            divContent.appendChild(this.noderegister[html].html.cloneNode(true));
        } else {
            if (parseInt(this.render.version) === 3) {
                //Vue 3
                let wrapper = this.render.h(this.noderegister[html].html, this.noderegister[html].props, this.noderegister[html].options);
                wrapper.appContext = this.parent;
                this.render.render(wrapper, divContent);

            } else {
                // Vue 2
                let wrapper = new this.render({
                    parent: this.parent,
                    render: h => h(this.noderegister[html].html, { props: this.noderegister[html].props }),
                    ...this.noderegister[html].options
                }).$mount();
                //
                divContent.appendChild(wrapper.$el);
            }
        }

        Object.entries(data).forEach(
            ([key, value]) => {
                if (typeof value === "object") {
                    insertObjectkeys(null, key, key);
                } else {
                    const elems = divContent.querySelectorAll(`[df-${key}]`);
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].value = value;
                        if (elems[i].isContentEditable) {
                            elems[i].innerText = value;
                        }
                    }
                }
            }
        );

        function insertObjectkeys(object, name, completname) {
            object = !object ? data[name] : object[name];
            if (object) {
                Object.entries(object).forEach(
                    ([key, value]) => {
                        if (typeof value === "object") {
                            insertObjectkeys(object, key, `${completname}-${key}`);
                        } else {
                            const elems = divContent.querySelectorAll(`[df-${completname}-${key}]`);
                            for (var i = 0; i < elems.length; i++) {
                                elems[i].value = value;
                                if (elems[i].isContentEditable) {
                                    elems[i].innerText = value;
                                }
                            }
                        }
                    }
                );
            }
        }

        divNode.appendChild(divInputs);
        divNode.appendChild(divContent);
        divNode.appendChild(divOutputs);
        divNode.style.top = ele_pos_y + "px";
        divNode.style.left = ele_pos_x + "px";
        divParent.appendChild(divNode);
        this.canvas.appendChild(divParent);

        let json = {
            id: newNodeId,
            name: name,
            data: data,
            class: classOverride,
            html: html,
            typenode: typenode,
            inputs: jsonInputs,
            outputs: jsonOutputs,
            pos_x: ele_pos_x,
            pos_y: ele_pos_y,
        };
        this.drawflow.drawflow[this.module].data[newNodeId] = json;

        this.dispatch('nodeCreated', newNodeId);
        if (!this.useuuid) {
            this.nodeId++;
        }
        return newNodeId;
    }

    addNodeImport(dataNode, precanvas) {
        const parent = document.createElement('div');
        parent.classList.add("parent-node");

        const divNode = document.createElement('div');
        divNode.innerHTML = "";
        divNode.setAttribute("id", "node-" + dataNode.id);
        divNode.classList.add("drawflow-node");
        if (dataNode.class) {
            divNode.classList.add(...dataNode.class.split(' '));
        }

        const inputs = document.createElement('div');
        inputs.classList.add("inputs");

        const outputs = document.createElement('div');
        outputs.classList.add("outputs");

        Object.keys(dataNode.inputs).forEach(
            (input_item) => {
                const divInput = document.createElement('div');
                divInput.classList.add("input");
                divInput.classList.add(input_item);
                inputs.appendChild(divInput);

                const connections = dataNode.inputs[input_item].connections;

                Object.keys(connections).forEach(
                    (output_item) => {
                        const svgConnection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
                        svgPath.classList.add("main-path");
                        svgPath.setAttributeNS(null, 'd', '');
                        svgConnection.classList.add(
                            "connection",
                            `node_in_node-${dataNode.id}`,
                            `node_out_node-${connections[output_item].node}`,
                            connections[output_item].input,
                            input_item,
                        );

                        svgConnection.appendChild(svgPath);
                        precanvas.appendChild(svgConnection);

                    }
                );
            }
        );

        for (var x = 0; x < Object.keys(dataNode.outputs).length; x++) {
            const divOutput = document.createElement('div');
            divOutput.classList.add("output", `output_${x + 1}`);
            outputs.appendChild(divOutput);
        }

        const content = document.createElement('div');
        content.classList.add("drawflow_content_node");

        if (dataNode.typenode === false) {
            content.innerHTML = dataNode.html;
        } else if (dataNode.typenode === true) {
            content.appendChild(this.noderegister[dataNode.html].html.cloneNode(true));
        } else {
            if (parseInt(this.render.version) === 3) {
                //Vue 3
                let wrapper = this.render.h(this.noderegister[dataNode.html].html, this.noderegister[dataNode.html].props, this.noderegister[dataNode.html].options);
                wrapper.appContext = this.parent;
                this.render.render(wrapper, content);

            } else {
                //Vue 2
                let wrapper = new this.render({
                    parent: this.parent,
                    render: h => h(this.noderegister[dataNode.html].html, { props: this.noderegister[dataNode.html].props }),
                    ...this.noderegister[dataNode.html].options
                })
                    .$mount();
                content.appendChild(wrapper.$el);
            }
        }

        Object.entries(dataNode.data).forEach(
            ([key, value]) => {
                if (typeof value === "object") {
                    insertObjectkeys(null, key, key);
                } else {
                    const elems = content.querySelectorAll(`[df-${key}]`);
                    for (var i = 0; i < elems.length; i++) {
                        elems[i].value = value;
                        if (elems[i].isContentEditable) {
                            elems[i].innerText = value;
                        }
                    }
                }
            }
        );

        function insertObjectkeys(object, name, completname) {
            object = !object ? dataNode.data[name] : object[name];
            if (!object) {
                return;
            }
            Object.entries(object).forEach(
                ([key, value]) => {
                    if (typeof value === "object") {
                        insertObjectkeys(object, key, `${completname}-${key}`);
                    } else {
                        const elems = content.querySelectorAll(`[df-${completname}-${key}]`);
                        for (var i = 0; i < elems.length; i++) {
                            elems[i].value = value;
                            if (elems[i].isContentEditable) {
                                elems[i].innerText = value;
                            }
                        }
                    }
                }
            );
        }

        divNode.appendChild(inputs);
        divNode.appendChild(content);
        divNode.appendChild(outputs);
        divNode.style.top = dataNode.pos_y + "px";
        divNode.style.left = dataNode.pos_x + "px";
        parent.appendChild(divNode);
        this.canvas.appendChild(parent);
    }

    addRerouteImport(dataNode) {
        const reroute_width = this.reroute_width;
        const reroute_fix_curvature = this.reroute_fix_curvature;
        const container = this.container;

        Object.keys(dataNode.outputs).map(
            (outputItem) => {
                Object.keys(dataNode.outputs[outputItem].connections).map(
                    (inputItem) => reroute(outputItem, inputItem)
                );
            }
        );

        function reroute(outputItem, inputItem) {
            const connections = dataNode.outputs[outputItem].connections[inputItem];
            connections?.points?.forEach(
                (item, idx) => {
                    const input_id = connections.node;
                    const input_class = connections.output;
                    const elm = container.querySelector(`.connection.node_in_node-${input_id}.node_out_node-${dataNode.id}.${outputItem}.${input_class}`);

                    if (reroute_fix_curvature && idx === 0) {
                        for (var z = 0; z < connections.points.length; z++) {
                            const svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
                            svgPath.classList.add("main-path");
                            svgPath.setAttributeNS(null, 'd', '');
                            elm.appendChild(svgPath);
                        }
                    }

                    const svgDot = document.createElementNS('http://www.w3.org/2000/svg', "circle");
                    svgDot.classList.add("point");
                    svgDot.setAttributeNS(null, 'cx', item.pos_x);
                    svgDot.setAttributeNS(null, 'cy', item.pos_y);
                    svgDot.setAttributeNS(null, 'r', reroute_width);
                    elm.appendChild(svgDot);
                }
            );
        }
    }

    updateNodeValue(event) {
        const attr = event.target.attributes;
        for (var i = 0; i < attr.length; i++) {

            if (attr[i].nodeName.startsWith('df-')) {
                const keys = attr[i].nodeName.slice(3).split("-");
                const target = this.drawflow.drawflow[this.module].data[event.target.closest(".drawflow_content_node").parentElement.id.slice(5)].data;

                for (var index = 0; index < keys.length - 1; index += 1) {
                    if (!target[keys[index]]) {
                        target[keys[index]] = {};
                    }
                    target = target[keys[index]];
                }
                target[keys[keys.length - 1]] = event.target.value;
                if (event.target.isContentEditable) {
                    target[keys[keys.length - 1]] = event.target.innerText;
                }
                this.dispatch('nodeDataChanged', event.target.closest(".drawflow_content_node").parentElement.id.slice(5));
            }
        }
    }

    updateNodeDataFromId(id, data) {
        const moduleName = this.getModuleNameFromNodeId(id);
        this.drawflow.drawflow[moduleName].data[id].data = data;

        if (this.module === moduleName) {
            const content = this.container.querySelector(`#node-${id}`);

            Object.entries(data).forEach(
                ([key, value]) => {
                    if (typeof value === "object") {
                        insertObjectkeys(null, key, key);
                    } else {
                        const elems = content.querySelectorAll(`[df-${key}]`);
                        for (var i = 0; i < elems.length; i++) {
                            elems[i].value = value;
                            if (elems[i].isContentEditable) {
                                elems[i].innerText = value;
                            }
                        }
                    }
                }
            );

            function insertObjectkeys(object, name, completname) {
                object = !object ? data[name] : object[name];
                if (!object) {
                    return;
                }
                Object.entries(object).forEach(
                    ([key, value]) => {
                        if (typeof value === "object") {
                            insertObjectkeys(object, key, `${completname}-${key}`);
                        } else {
                            const elems = content.querySelectorAll(`[df-${completname}-${key}]`);
                            for (var i = 0; i < elems.length; i++) {
                                elems[i].value = value;
                                if (elems[i].isContentEditable) {
                                    elems[i].innerText = value;
                                }
                            }
                        }
                    }
                );
            }
        }
    }

    addNodeInput(id) {
        const moduleName = this.getModuleNameFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        const numInputs = Object.keys(infoNode.inputs).length;
        if (this.module === moduleName) {
            //Draw input
            const divInput = document.createElement('div');
            divInput.classList.add('input', `input_${numInputs + 1}`);
            const parent = this.container.querySelector(`#node-${id} .inputs`);
            parent.appendChild(divInput);
            this.updateConnectionNodes(`node-${id}`);
        }
        this.drawflow.drawflow[moduleName].data[id].inputs[`input_${numInputs + 1}`] = { "connections": [] };
    }

    addNodeOutput(id) {
        const moduleName = this.getModuleNameFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        const numOutputs = Object.keys(infoNode.outputs).length;
        if (this.module === moduleName) {
            //Draw output
            const divOutput = document.createElement('div');
            divOutput.classList.add('output', `output_${numOutputs + 1}`);
            const parent = this.container.querySelector('#node-' + id + ' .outputs');
            parent.appendChild(divOutput);
            this.updateConnectionNodes('node-' + id);
        }
        this.drawflow.drawflow[moduleName].data[id].outputs[`output_${numOutputs + 1}`] = { "connections": [] };
    }

    removeNodeInput(id, input_class) {
        const moduleName = this.getModuleNameFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        if (this.module === moduleName) {
            this.container.querySelector(`#node-${id} .inputs .input.${input_class}`).remove();
        }

        const removeInputs = [];
        Object.keys(infoNode.inputs[input_class].connections).forEach(
            (key, idx) => {
                const connections = infoNode.inputs[input_class].connections[idx];
                const id_output = connections.node;
                const output_class = connections.input;
                removeInputs.push({ id_output, id, output_class, input_class });
            }
        );

        // Remove connections
        removeInputs.forEach((item) => this.removeSingleConnection(item.id_output, item.id, item.output_class, item.input_class));

        delete this.drawflow.drawflow[moduleName].data[id].inputs[input_class];

        // Update connection
        const connections = [];
        const connectionsInputs = this.drawflow.drawflow[moduleName].data[id].inputs;
        Object.keys(connectionsInputs).forEach((key) => connections.push(connectionsInputs[key]));

        this.drawflow.drawflow[moduleName].data[id].inputs = {};

        const input_class_id = input_class.slice(6);

        let nodeUpdates = [];
        connections.forEach((item, idx) => {
            item.connections.forEach((itemx) => nodeUpdates.push(itemx));
            this.drawflow.drawflow[moduleName].data[id].inputs[`input_${idx + 1}`] = item;
        });
        nodeUpdates = new Set(nodeUpdates.map(e => JSON.stringify(e)));
        nodeUpdates = Array.from(nodeUpdates).map(e => JSON.parse(e));

        if (this.module === moduleName) {
            const elems = this.container.querySelectorAll(`#node-${id} .inputs .input`);
            elems.forEach((item) => {
                const id_class = item.classList[1].slice(6);
                if (parseInt(input_class_id) < parseInt(id_class)) {
                    item.classList.remove(`input_${id_class}`);
                    item.classList.add(`input_${id_class - 1}`);
                }
            });
        }

        nodeUpdates.forEach(
            (itemx) => {
                const connections = this.drawflow.drawflow[moduleName].data[itemx.node].outputs[itemx.input].connections;
                connections.forEach(
                    (itemz, idx) => {
                        if (itemz.node == id) {
                            const output_id = itemz.output.slice(6);
                            if (parseInt(input_class_id) < parseInt(output_id)) {
                                if (this.module === moduleName) {
                                    const elm = this.container.querySelector(`.connection.node_in_node-${id}.node_out_node-${itemx.node}.${itemx.input}.input_${output_id}`);
                                    elm.classList.remove(`input_${output_id}`);
                                    elm.classList.add(`input_${output_id - 1}`);
                                }
                                if (itemz.points) {
                                    connections[idx] = { node: itemz.node, output: `input_${output_id - 1}`, points: itemz.points };
                                } else {
                                    connections[idx] = { node: itemz.node, output: `input_${output_id - 1}` };
                                }
                            }
                        }
                    }
                );
            }
        );

        this.updateConnectionNodes(`node-${id}`);
    }

    removeNodeOutput(id, output_class) {
        const moduleName = this.getModuleNameFromNodeId(id);
        const infoNode = this.getNodeFromId(id);

        if (this.module === moduleName) {
            this.container.querySelector('#node-' + id + ' .outputs .output.' + output_class).remove();
        }

        const removeOutputs = [];
        Object.keys(infoNode.outputs[output_class].connections).forEach(
            (key, index) => {
                const id_input = infoNode.outputs[output_class].connections[index].node;
                const input_class = infoNode.outputs[output_class].connections[index].output;
                removeOutputs.push({ id, id_input, output_class, input_class });
            }
        );

        // Remove connections
        removeOutputs.forEach((item) => this.removeSingleConnection(item.id, item.id_input, item.output_class, item.input_class));

        delete this.drawflow.drawflow[moduleName].data[id].outputs[output_class];

        // Update connection
        const connections = [];
        const connectionsOuputs = this.drawflow.drawflow[moduleName].data[id].outputs;
        Object.keys(connectionsOuputs).forEach((key) => connections.push(connectionsOuputs[key]));

        this.drawflow.drawflow[moduleName].data[id].outputs = {};
        const output_class_id = output_class.slice(7);

        let nodeUpdates = [];
        connections.forEach(
            (item, idx) => {
                item.connections.forEach((itemx) => nodeUpdates.push({ node: itemx.node, output: itemx.output }));
                this.drawflow.drawflow[moduleName].data[id].outputs[`output_${idx + 1}`] = item;
            }
        );
        nodeUpdates = new Set(nodeUpdates.map(e => JSON.stringify(e)));
        nodeUpdates = Array.from(nodeUpdates).map(e => JSON.parse(e));

        if (this.module === moduleName) {
            const elems = this.container.querySelectorAll("#node-" + id + " .outputs .output");
            elems.forEach(
                (item) => {
                    const id_class = item.classList[1].slice(7);
                    if (parseInt(output_class_id) < parseInt(id_class)) {
                        item.classList.remove('output_' + id_class);
                        item.classList.add('output_' + (id_class - 1));
                    }
                }
            );
        }

        nodeUpdates.forEach((itemx) => {
            const connections = this.drawflow.drawflow[moduleName].data[itemx.node].inputs[itemx.output].connections;
            connections.forEach(
                (itemz, idx) => {
                    if (itemz.node != id) {
                        return;
                    }
                    const input_id = itemz.input.slice(7);
                    if (parseInt(output_class_id) < parseInt(input_id)) {
                        if (this.module === moduleName) {
                            const elm = this.container.querySelector(`.connection.node_in_node-${itemx.node}.node_out_node-${id}.output_${input_id}.${itemx.output}`);
                            elm.classList.remove('output_' + input_id);
                            elm.classList.remove(itemx.output);
                            elm.classList.add('output_' + (input_id - 1));
                            elm.classList.add(itemx.output);
                        }
                        if (itemz.points) {
                            connections[idx] = { node: itemz.node, input: `output_${input_id - 1}`, points: itemz.points };
                        } else {
                            connections[idx] = { node: itemz.node, input: `output_${input_id - 1}` };
                        }
                    }
                }
            );
        });

        this.updateConnectionNodes(`node-${id}`);
    }

    removeNodeId(id) {
        this.removeConnectionNodeId(id);
        var moduleName = this.getModuleNameFromNodeId(id.slice(5));

        if (this.module === moduleName) {
            this.container.querySelector(`#${id}`).remove();
        }

        delete this.drawflow.drawflow[moduleName].data[id.slice(5)];
        this.dispatch('nodeRemoved', id.slice(5));
    }

    removeConnection() {
        if (!this.connection_selected) {
            return;
        }

        const module = this.drawflow.drawflow[this.module];
        const listclass = this.connection_selected.parentElement.classList;
        const idInput = listclass[1].slice(13);
        const idOutput = listclass[2].slice(14);
        const classInput = listclass[4];
        const classOutput = listclass[3];

        this.connection_selected.parentElement.remove();
        //console.log(listclass);
        const index_out = module.data[idOutput].outputs[classOutput].connections.findIndex((item) => item.node === idInput && item.output === classInput);
        const index_in = module.data[idInput].inputs[classInput].connections.findIndex((item) => item.node === idOutput && item.input === classOutput);

        module.data[idOutput].outputs[classOutput].connections.splice(index_out, 1);
        module.data[idInput].inputs[classInput].connections.splice(index_in, 1);

        this.dispatch('connectionRemoved', { output_id: idOutput, input_id: idInput, output_class: classOutput, input_class: classInput, });
        this.connection_selected = null;
    }

    removeSingleConnection(idOutput, idInput, classOutput, classInput) {
        var nodeOneModule = this.getModuleNameFromNodeId(idOutput);
        var nodeTwoModule = this.getModuleNameFromNodeId(idInput);

        // Check nodes in same module.
        if (nodeOneModule !== nodeTwoModule) {
            return false;
        }

        const module = this.drawflow.drawflow[nodeOneModule];

        // Check connection exist
        const exists = module.data[idOutput].outputs[classOutput].connections.findIndex((item) => item.node == idInput && item.output === classInput);
        if (exists <= -1) {
            return false;
        }

        if (this.module === nodeOneModule) {
            // In same module with view.
            this.container.querySelector(`.connection.node_in_node-${idInput}.node_out_node-${idOutput}.${classOutput}.${classInput}`).remove();
        }

        const outIndex = module.data[idOutput].outputs[classOutput].connections.findIndex((item) => item.node == idInput && item.output === classInput);
        const inIndex = module.data[idInput].inputs[classInput].connections.findIndex((item) => item.node == idOutput && item.input === classOutput);

        module.data[idOutput].outputs[classOutput].connections.splice(outIndex, 1);
        module.data[idInput].inputs[classInput].connections.splice(inIndex, 1);

        this.dispatch('connectionRemoved', { output_id: idOutput, input_id: idInput, output_class: classOutput, input_class: classInput });
        return true;
    }

    removeConnectionNodeId(id) {
        const idSearchIn = `node_in_${id}`;
        const idSearchOut = `node_out_${id}`;

        const module = this.drawflow.drawflow[this.module];

        const elemsOut = this.container.querySelectorAll(`.${idSearchOut}`);
        for (var i = elemsOut.length - 1; i >= 0; i--) {
            const listclass = elemsOut[i].classList;
            const inputId = listclass[1].slice(13);
            const outputId = listclass[2].slice(14);
            const inputClass = listclass[4];
            const outputClass = listclass[3];

            const index_in = module.data[inputId].inputs[inputClass].connections.findIndex((item) => item.node === outputId && item.input === outputClass);
            const index_out = module.data[outputId].outputs[outputClass].connections.findIndex((item) => item.node === inputId && item.output === inputClass);

            module.data[inputId].inputs[inputClass].connections.splice(index_in, 1);
            module.data[outputId].outputs[outputClass].connections.splice(index_out, 1);

            elemsOut[i].remove();

            this.dispatch('connectionRemoved', { output_id: outputId, input_id: inputId, output_class: outputClass, input_class: inputClass });
        }

        const elemsIn = this.container.querySelectorAll(`.${idSearchIn}`);
        for (var i = elemsIn.length - 1; i >= 0; i--) {
            const listclass = elemsIn[i].classList;
            const inputId = listclass[1].slice(13);
            const outputId = listclass[2].slice(14);
            const inputClass = listclass[4];
            const outputClass = listclass[3];

            const indexOut = module.data[outputId].outputs[outputClass].connections.findIndex((item) => item.node === inputId && item.output === inputClass);
            const indexIn = module.data[inputId].inputs[inputClass].connections.findIndex((item) => item.node === outputId && item.input === outputClass);

            module.data[outputId].outputs[outputClass].connections.splice(indexOut, 1);
            module.data[inputId].inputs[inputClass].connections.splice(indexIn, 1);

            elemsIn[i].remove();

            this.dispatch('connectionRemoved', { output_id: outputId, input_id: inputId, output_class: outputClass, input_class: inputClass });
        }
    }

    getModuleNameFromNodeId(id) {
        let rv;
        const editor = this.drawflow.drawflow;
        Object.keys(editor).forEach(
            (moduleName) => {
                Object.keys(editor[moduleName].data).forEach( //TODO: tm: use find
                    (node) => {
                        if (node == id) {
                            rv = moduleName;
                        }
                    }
                );
            }
        );
        return rv;
    }

    addModule(name) {
        this.drawflow.drawflow[name] = { "data": {} };
        this.dispatch('moduleCreated', name);
    }

    changeModule(name) {
        this.dispatch('moduleChanged', name);

        this.module = name;
        this.canvas.innerHTML = "";
        this.canvas_x = 0;
        this.canvas_y = 0;
        this.pos_x = 0;
        this.pos_y = 0;
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.zoom = 1;
        this.zoom_last_value = 1;
        this.canvas.style.transform = '';
        this.import(this.drawflow, false);
    }

    removeModule(name) {
        if (this.module === name) {
            this.changeModule('Home');
        }
        delete this.drawflow.drawflow[name];
        this.dispatch('moduleRemoved', name);
    }

    clearModuleSelected() {
        this.canvas.innerHTML = "";
        this.drawflow.drawflow[this.module] = { "data": {} };
    }

    clear() {
        this.canvas.innerHTML = "";
        this.drawflow = { "drawflow": { "Home": { "data": {} } } };
    }
    export() {
        const dataExport = JSON.parse(JSON.stringify(this.drawflow));
        this.dispatch('export', dataExport);
        return dataExport;
    }

    import(data, notifi = true) {
        this.clear();
        this.drawflow = JSON.parse(JSON.stringify(data));
        this.load();
        notifi && this.dispatch('import', 'import');
    }

    /* Events */
    on(event, callback) {
        // Check if the callback is not a function
        if (typeof callback !== 'function') {
            console.error(`The listener callback must be a function, the given type is ${typeof callback}`);
            return false;
        }

        // Check if the event is not a string
        if (typeof event !== 'string') {
            console.error(`The event name must be a string, the given type is ${typeof event}`);
            return false;
        }

        // Check if this event not exists
        if (!this.events[event]) {
            this.events[event] = {
                listeners: []
            };
        }
        this.events[event].listeners.push(callback);
    }

    removeListener(event, callback) {
        // Check if this event not exists
        if (!this.events[event]) {
            return false;
        }

        const listeners = this.events[event].listeners;
        const listenerIndex = listeners.indexOf(callback);
        const hasListener = listenerIndex > -1;
        if (hasListener) {
            listeners.splice(listenerIndex, 1);
        }
    }

    dispatch(event, details) {
        this.events[event]?.listeners.forEach((listener) => listener(details));
    }
}

function getUuid() { // http://www.ietf.org/rfc/rfc4122.txt
    const s = [];
    const hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    const uuid = s.join("");
    return uuid;
}

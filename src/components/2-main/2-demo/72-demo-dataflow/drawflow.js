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
        Object.keys(editor).map(
            function (moduleName) {
                Object.keys(editor[moduleName].data).map( //TODO: use find instead of map
                    function (id) {
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
            const searchConnection = connections.findIndex(function (item, i) {
                return item.node === nodeUpdateIn && item.output === classInput;
            });

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
        const ele_last = isTouch ? document.elementFromPoint(e_pos_x, e_pos_y) : e.target;

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
            if (ele_last.classList[0] === 'input' || (this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node'))) {

                if (this.force_first_input && (ele_last.closest(".drawflow_content_node") != null || ele_last.classList[0] === 'drawflow-node')) {
                    const closest = ele_last.closest(".drawflow_content_node");
                    if (closest) {
                        var input_id = closest.parentElement.id;
                    } else {
                        var input_id = ele_last.id;
                    }
                    if (Object.keys(this.getNodeFromId(input_id.slice(5)).inputs).length === 0) {
                        var input_class = false;
                    } else {
                        var input_class = "input_1";
                    }
                } else {
                    // Fix connection;
                    var input_id = ele_last.parentElement.parentElement.id;
                    var input_class = ele_last.classList[1];
                }
                var output_id = this.elem_selected.parentElement.parentElement.id;
                var output_class = this.elem_selected.classList[1];

                if (output_id !== input_id && input_class !== false) {

                    if (this.container.querySelectorAll(`.connection.node_in_${input_id}.node_out_${output_id}.${output_class}.${input_class}`).length === 0) {
                        // Conection no exist save connection
                        this.connection_ele.classList.add("node_in_" + input_id);
                        this.connection_ele.classList.add("node_out_" + output_id);
                        this.connection_ele.classList.add(output_class);
                        this.connection_ele.classList.add(input_class);
                        var id_input = input_id.slice(5);
                        var id_output = output_id.slice(5);

                        this.drawflow.drawflow[this.module].data[id_output].outputs[output_class].connections.push({ "node": id_input, "output": input_class });
                        this.drawflow.drawflow[this.module].data[id_input].inputs[input_class].connections.push({ "node": id_output, "input": output_class });
                        this.updateConnectionNodes('node-' + id_output);
                        this.updateConnectionNodes('node-' + id_input);
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
        };
        if (this.node_selected || this.connection_selected) {
            var deletebox = document.createElement('div');
            deletebox.classList.add("drawflow-delete");
            deletebox.innerHTML = "x";

            if (this.node_selected) {
                this.node_selected.appendChild(deletebox);
            }

            if (this.connection_selected && (this.connection_selected.parentElement.classList.length > 1)) {
                deletebox.style.top = e.clientY * (this.canvas.clientHeight / (this.canvas.clientHeight * this.zoom)) - (this.canvas.getBoundingClientRect().y * (this.canvas.clientHeight / (this.canvas.clientHeight * this.zoom))) + "px";
                deletebox.style.left = e.clientX * (this.canvas.clientWidth / (this.canvas.clientWidth * this.zoom)) - (this.canvas.getBoundingClientRect().x * (this.canvas.clientWidth / (this.canvas.clientWidth * this.zoom))) + "px";

                this.canvas.appendChild(deletebox);
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

    createCurvature(start_pos_x, start_pos_y, end_pos_x, end_pos_y, curvature_value, type) {
        var line_x = start_pos_x;
        var line_y = start_pos_y;
        var x = end_pos_x;
        var y = end_pos_y;
        var curvature = curvature_value;
        //type openclose open close other
        switch (type) {
            case 'open': {
                let hx1, hx2;
                if (start_pos_x >= end_pos_x) {
                    hx1 = line_x + Math.abs(x - line_x) * curvature;
                    hx2 = x - Math.abs(x - line_x) * (curvature * -1);
                } else {
                    hx1 = line_x + Math.abs(x - line_x) * curvature;
                    hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ` M ${line_x} ${line_y} C ${hx1} ${line_y} ${hx2} ${y} ${x}  ${y}`;
            }
            case 'close': {
                let hx1, hx2;
                if (start_pos_x >= end_pos_x) {
                    hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                    hx2 = x - Math.abs(x - line_x) * curvature;
                } else {
                    hx1 = line_x + Math.abs(x - line_x) * curvature;
                    hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ` M ${line_x} ${line_y} C ${hx1} ${line_y} ${hx2} ${y} ${x}  ${y}`;
            }
            case 'other': {
                let hx1, hx2;
                if (start_pos_x >= end_pos_x) {
                    hx1 = line_x + Math.abs(x - line_x) * (curvature * -1);
                    hx2 = x - Math.abs(x - line_x) * (curvature * -1);
                } else {
                    hx1 = line_x + Math.abs(x - line_x) * curvature;
                    hx2 = x - Math.abs(x - line_x) * curvature;
                }
                return ` M ${line_x} ${line_y} C ${hx1} ${line_y} ${hx2} ${y} ${x}  ${y}`;
            }
            default: {
                let hx1 = line_x + Math.abs(x - line_x) * curvature;
                let hx2 = x - Math.abs(x - line_x) * curvature;

                return ` M ${line_x} ${line_y} C ${hx1} ${line_y} ${hx2} ${y} ${x}  ${y}`;
            }
        }
    }

    drawConnection(ele) {
        var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
        this.connection_ele = connection;

        var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        path.classList.add("main-path");
        path.setAttributeNS(null, 'd', '');
        // path.innerHTML = 'a';
        connection.classList.add("connection");
        connection.appendChild(path);
        this.canvas.appendChild(connection);

        var id_output = ele.parentElement.parentElement.id.slice(5);
        var output_class = ele.classList[1];
        this.dispatch('connectionStart', { output_id: id_output, output_class: output_class });

    }

    updateConnection(eX, eY) {
        const precanvas = this.canvas;
        const zoom = this.zoom;

        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;

        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;

        var path = this.connection_ele.children[0];

        var line_x = this.elem_selected.offsetWidth / 2 + (this.elem_selected.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
        var line_y = this.elem_selected.offsetHeight / 2 + (this.elem_selected.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

        var x = eX * (this.canvas.clientWidth / (this.canvas.clientWidth * this.zoom)) - (this.canvas.getBoundingClientRect().x * (this.canvas.clientWidth / (this.canvas.clientWidth * this.zoom)));
        var y = eY * (this.canvas.clientHeight / (this.canvas.clientHeight * this.zoom)) - (this.canvas.getBoundingClientRect().y * (this.canvas.clientHeight / (this.canvas.clientHeight * this.zoom)));

        var curvature = this.curvature;
        var lineCurve = this.createCurvature(line_x, line_y, x, y, curvature, 'openclose');
        path.setAttributeNS(null, 'd', lineCurve);

    }

    addConnection(id_output, id_input, output_class, input_class) {
        var nodeOneModule = this.getModuleNameFromNodeId(id_output);
        var nodeTwoModule = this.getModuleNameFromNodeId(id_input);

        if (nodeOneModule === nodeTwoModule) {
            var dataNode = this.getNodeFromId(id_output);
            var exist = false;

            for (var checkOutput in dataNode.outputs[output_class].connections) {
                var connectionSearch = dataNode.outputs[output_class].connections[checkOutput];
                if (connectionSearch.node == id_input && connectionSearch.output == input_class) {
                    exist = true;
                }
            }

            // Check connection exist
            if (exist === false) {
                //Create Connection
                this.drawflow.drawflow[nodeOneModule].data[id_output].outputs[output_class].connections.push({ "node": id_input.toString(), "output": input_class });
                this.drawflow.drawflow[nodeOneModule].data[id_input].inputs[input_class].connections.push({ "node": id_output.toString(), "input": output_class });

                if (this.module === nodeOneModule) {
                    //Draw connection
                    var connection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                    var path = document.createElementNS('http://www.w3.org/2000/svg', "path");
                    path.classList.add("main-path");
                    path.setAttributeNS(null, 'd', '');
                    // path.innerHTML = 'a';
                    connection.classList.add("connection");
                    connection.classList.add("node_in_node-" + id_input);
                    connection.classList.add("node_out_node-" + id_output);
                    connection.classList.add(output_class);
                    connection.classList.add(input_class);
                    connection.appendChild(path);
                    this.canvas.appendChild(connection);
                    this.updateConnectionNodes('node-' + id_output);
                    this.updateConnectionNodes('node-' + id_input);
                }

                this.dispatch('connectionCreated', { output_id: id_output, input_id: id_input, output_class: output_class, input_class: input_class });
            }
        }
    }

    updateConnectionNodes(id) {
        // Here we stay
        const idSearch = 'node_in_' + id;
        const idSearchOut = 'node_out_' + id;
        var line_path = this.line_path / 2;
        const container = this.container;
        const precanvas = this.canvas;
        const curvature = this.curvature;
        const createCurvature = this.createCurvature;
        const reroute_curvature = this.reroute_curvature;
        const reroute_curvature_start_end = this.reroute_curvature_start_end;
        const reroute_fix_curvature = this.reroute_fix_curvature;
        const rerouteWidth = this.reroute_width;
        const zoom = this.zoom;
        let precanvasWitdhZoom = precanvas.clientWidth / (precanvas.clientWidth * zoom);
        precanvasWitdhZoom = precanvasWitdhZoom || 0;
        let precanvasHeightZoom = precanvas.clientHeight / (precanvas.clientHeight * zoom);
        precanvasHeightZoom = precanvasHeightZoom || 0;

        const elemsOut = container.querySelectorAll(`.${idSearchOut}`);

        Object.keys(elemsOut).map(
            function (item, index) {
                if (elemsOut[item].querySelector('.point') === null) {
                    var elemtsearchId_out = container.querySelector(`#${id}`);

                    var id_search = elemsOut[item].classList[1].replace('node_in_', '');
                    var elemtsearchId = container.querySelector(`#${id_search}`);

                    var elemtsearch = elemtsearchId.querySelectorAll('.' + elemsOut[item].classList[4])[0];

                    var eX = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                    var eY = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                    var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + elemsOut[item].classList[3])[0];

                    var line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                    var line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                    var x = eX;
                    var y = eY;

                    const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
                    elemsOut[item].children[0].setAttributeNS(null, 'd', lineCurve);
                } else {
                    const points = elemsOut[item].querySelectorAll('.point');
                    let linecurve = '';
                    const reoute_fix = [];
                    points.forEach(
                        (item, i) => {
                            if (i === 0 && ((points.length - 1) === 0)) {
                                var elemtsearchId_out = container.querySelector(`#${id}`);
                                var elemtsearch = item;

                                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;

                                var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[3])[0];
                                var line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);

                                var elemtsearchId_out = item;
                                var id_search = item.parentElement.classList[1].replace('node_in_', '');
                                var elemtsearchId = container.querySelector(`#${id_search}`);
                                var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0];

                                var elemtsearchIn = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0];
                                var eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;


                                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else if (i === 0) {
                                var elemtsearchId_out = container.querySelector(`#${id}`);
                                var elemtsearch = item;

                                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;

                                var elemtsearchOut = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[3])[0];
                                var line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);

                                // SECOND
                                var elemtsearchId_out = item;
                                var elemtsearch = points[i + 1];

                                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else if (i === (points.length - 1)) {
                                var elemtsearchId_out = item;

                                var id_search = item.parentElement.classList[1].replace('node_in_', '');
                                var elemtsearchId = container.querySelector(`#${id_search}`);
                                var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0];

                                var elemtsearchIn = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0];
                                var eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;
                                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else {
                                var elemtsearchId_out = item;
                                var elemtsearch = points[i + 1];

                                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * (precanvas.clientWidth / (precanvas.clientWidth * zoom)) + rerouteWidth;
                                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * (precanvas.clientHeight / (precanvas.clientHeight * zoom)) + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            }
                        }
                    );
                    if (reroute_fix_curvature) {
                        reoute_fix.forEach(
                            (itempath, i) => {
                                elemsOut[item].children[i].setAttributeNS(null, 'd', itempath);
                            }
                        );

                    } else {
                        elemsOut[item].children[0].setAttributeNS(null, 'd', linecurve);
                    }
                }
            }
        );

        const elems = container.querySelectorAll(`.${idSearch}`);
        Object.keys(elems).map(
            function (item, index) {
                if (elems[item].querySelector('.point') === null) {
                    var elemtsearchId_in = container.querySelector(`#${id}`);

                    var id_search = elems[item].classList[2].replace('node_out_', '');
                    var elemtsearchId = container.querySelector(`#${id_search}`);
                    var elemtsearch = elemtsearchId.querySelectorAll('.' + elems[item].classList[3])[0];

                    var line_x = elemtsearch.offsetWidth / 2 + (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                    var line_y = elemtsearch.offsetHeight / 2 + (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                    var elemtsearchId_in = elemtsearchId_in.querySelectorAll('.' + elems[item].classList[4])[0];
                    var x = elemtsearchId_in.offsetWidth / 2 + (elemtsearchId_in.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                    var y = elemtsearchId_in.offsetHeight / 2 + (elemtsearchId_in.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                    const lineCurve = createCurvature(line_x, line_y, x, y, curvature, 'openclose');
                    elems[item].children[0].setAttributeNS(null, 'd', lineCurve);
                } else {
                    const points = elems[item].querySelectorAll('.point');
                    let linecurve = '';
                    const reoute_fix = [];
                    points.forEach(
                        (item, i) => {
                            if (i === 0 && ((points.length - 1) === 0)) {
                                var elemtsearchId_out = container.querySelector(`#${id}`);
                                var elemtsearch = item;

                                var line_x = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var line_y = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;

                                var elemtsearchIn = elemtsearchId_out.querySelectorAll('.' + item.parentElement.classList[4])[0];
                                var eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);

                                var elemtsearchId_out = item;
                                var id_search = item.parentElement.classList[2].replace('node_out_', '');
                                var elemtsearchId = container.querySelector(`#${id_search}`);
                                var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0];

                                var elemtsearchOut = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0];
                                var line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                                var eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else if (i === 0) {
                                // FIRST
                                var elemtsearchId_out = item;
                                var id_search = item.parentElement.classList[2].replace('node_out_', '');
                                var elemtsearchId = container.querySelector(`#${id_search}`);
                                var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0];
                                var elemtsearchOut = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[3])[0];
                                var line_x = elemtsearchOut.offsetWidth / 2 + (elemtsearchOut.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var line_y = elemtsearchOut.offsetHeight / 2 + (elemtsearchOut.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                                var eX = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var eY = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'open');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);

                                // SECOND
                                var elemtsearchId_out = item;
                                var elemtsearch = points[i + 1];

                                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else if (i === (points.length - 1)) {
                                var elemtsearchId_out = item;

                                var id_search = item.parentElement.classList[1].replace('node_in_', '');
                                var elemtsearchId = container.querySelector(`#${id_search}`);
                                var elemtsearch = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0];

                                var elemtsearchIn = elemtsearchId.querySelectorAll('.' + item.parentElement.classList[4])[0];
                                var eX = elemtsearchIn.offsetWidth / 2 + (elemtsearchIn.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom;
                                var eY = elemtsearchIn.offsetHeight / 2 + (elemtsearchIn.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom;

                                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature_start_end, 'close');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            } else {
                                var elemtsearchId_out = item;
                                var elemtsearch = points[i + 1];

                                var eX = (elemtsearch.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var eY = (elemtsearch.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var line_x = (elemtsearchId_out.getBoundingClientRect().x - precanvas.getBoundingClientRect().x) * precanvasWitdhZoom + rerouteWidth;
                                var line_y = (elemtsearchId_out.getBoundingClientRect().y - precanvas.getBoundingClientRect().y) * precanvasHeightZoom + rerouteWidth;
                                var x = eX;
                                var y = eY;

                                var lineCurveSearch = createCurvature(line_x, line_y, x, y, reroute_curvature, 'other');
                                linecurve += lineCurveSearch;
                                reoute_fix.push(lineCurveSearch);
                            }
                        }
                    );

                    if (reroute_fix_curvature) {
                        reoute_fix.forEach(
                            (itempath, i) => {
                                elems[item].children[i].setAttributeNS(null, 'd', itempath);
                            }
                        );
                    } else {
                        elems[item].children[0].setAttributeNS(null, 'd', linecurve);
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

    createReroutePoint(ele) {
        this.connection_selected.classList.remove("selected");

        const nodeUpdate = this.connection_selected.parentElement.classList[2].slice(9);
        const nodeUpdateIn = this.connection_selected.parentElement.classList[1].slice(13);
        const output_class = this.connection_selected.parentElement.classList[3];
        const input_class = this.connection_selected.parentElement.classList[4];
        this.connection_selected = null;

        const svgDot = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        svgDot.classList.add("point");
        var pos_x = this.pos_x * (this.canvas.clientWidth / (this.canvas.clientWidth * this.zoom)) - (this.canvas.getBoundingClientRect().x * (this.canvas.clientWidth / (this.canvas.clientWidth * this.zoom)));
        var pos_y = this.pos_y * (this.canvas.clientHeight / (this.canvas.clientHeight * this.zoom)) - (this.canvas.getBoundingClientRect().y * (this.canvas.clientHeight / (this.canvas.clientHeight * this.zoom)));
        svgDot.setAttributeNS(null, 'cx', pos_x);
        svgDot.setAttributeNS(null, 'cy', pos_y);
        svgDot.setAttributeNS(null, 'r', this.reroute_width);

        let position_add_array_point = 0;

        if (this.reroute_fix_curvature) {
            const numberPoints = ele.parentElement.querySelectorAll(".main-path").length;

            var svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
            svgPath.classList.add("main-path");
            svgPath.setAttributeNS(null, 'd', '');
            ele.parentElement.insertBefore(svgPath, ele.parentElement.children[numberPoints]);

            if (numberPoints === 1) {
                ele.parentElement.appendChild(svgDot);
            } else {
                const search_point = Array.from(ele.parentElement.children).indexOf(ele);
                position_add_array_point = search_point;
                ele.parentElement.insertBefore(svgDot, ele.parentElement.children[search_point + numberPoints + 1]);
            }
        } else {
            ele.parentElement.appendChild(svgDot);
        }

        const nodeId = nodeUpdate.slice(5);
        const connections = this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections;
        const searchConnection = connections.findIndex(
            function (item, i) {
                return item.node === nodeUpdateIn && item.output === input_class;
            }
        );

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
            ele.parentElement.querySelectorAll(".main-path").forEach((item) => item.classList.remove("selected"));
        } else {
            connectionsToUpdate.points.push({ pos_x: pos_x, pos_y: pos_y });
        }

        this.dispatch('addReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    removeReroutePoint(ele) {
        const nodeUpdate = ele.parentElement.classList[2].slice(9);
        const nodeUpdateIn = ele.parentElement.classList[1].slice(13);
        const output_class = ele.parentElement.classList[3];
        const input_class = ele.parentElement.classList[4];

        let numberPointPosition = Array.from(ele.parentElement.children).indexOf(ele);

        const nodeId = nodeUpdate.slice(5);
        const connections = this.drawflow.drawflow[this.module].data[nodeId].outputs[output_class].connections;
        const searchConnection = connections.findIndex((item) => item.node === nodeUpdateIn && item.output === input_class);

        if (this.reroute_fix_curvature) {
            const numberMainPath = ele.parentElement.querySelectorAll(".main-path").length;
            ele.parentElement.children[numberMainPath - 1].remove();
            numberPointPosition -= numberMainPath;
            if (numberPointPosition < 0) {
                numberPointPosition = 0;
            }
        } else {
            numberPointPosition--;
        }
        connections[searchConnection].points.splice(numberPointPosition, 1);

        ele.remove();
        this.dispatch('removeReroute', nodeId);
        this.updateConnectionNodes(nodeUpdate);
    }

    registerNode(name, html, props = null, options = null) {
        this.noderegister[name] = { html: html, props: props, options: options };
    }

    getNodeFromId(id) {
        var moduleName = this.getModuleNameFromNodeId(id);
        return JSON.parse(JSON.stringify(this.drawflow.drawflow[moduleName].data[id]));
    }
    getNodesFromName(name) {
        var nodes = [];
        const editor = this.drawflow.drawflow;
        Object.keys(editor).map(function (moduleName, index) {
            for (var node in editor[moduleName].data) {
                if (editor[moduleName].data[node].name == name) {
                    nodes.push(editor[moduleName].data[node].id);
                }
            }
        });
        return nodes;
    }

    addNode(name, num_in, num_out, ele_pos_x, ele_pos_y, classOverride, data, html, typenode = false) {
        const newNodeId = this.useuuid ? getUuid() : this.nodeId;

        const divParent = document.createElement('div');
        divParent.classList.add("parent-node");

        const divNode = document.createElement('div');
        divNode.innerHTML = "";
        divNode.setAttribute("id", "node-" + newNodeId);
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
            elm.classList.add("input");
            elm.classList.add(`input_${x + 1}`);
            jsonInputs[`input_${x + 1}`] = { "connections": [] };
            divInputs.appendChild(elm);
        }

        const jsonOutputs = {};
        for (var x = 0; x < num_out; x++) {
            const elm = document.createElement('div');
            elm.classList.add("output");
            elm.classList.add(`output_${x + 1}`);
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
            function ([key, value]) {
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
                    function ([key, value]) {
                        if (typeof value === "object") {
                            insertObjectkeys(object, key, `${completname}-${key}`);
                        } else {
                            var elems = divContent.querySelectorAll(`[df-${completname}-${key}]`);
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

        Object.keys(dataNode.inputs).map(
            function (input_item) {
                const divInput = document.createElement('div');
                divInput.classList.add("input");
                divInput.classList.add(input_item);
                inputs.appendChild(divInput);

                Object.keys(dataNode.inputs[input_item].connections).map(
                    function (output_item) {
                        const svgConnection = document.createElementNS('http://www.w3.org/2000/svg', "svg");
                        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
                        svgPath.classList.add("main-path");
                        svgPath.setAttributeNS(null, 'd', '');
                        svgConnection.classList.add(
                            "connection",
                            `node_in_node-${dataNode.id}`,
                            `node_out_node-${dataNode.inputs[input_item].connections[output_item].node}`,
                            dataNode.inputs[input_item].connections[output_item].input,
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
            function ([key, value]) {
                if (typeof value === "object") {
                    insertObjectkeys(null, key, key);
                } else {
                    var elems = content.querySelectorAll(`[df-${key}]`);
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
            if (object === null) {
                var object = dataNode.data[name];
            } else {
                var object = object[name];
            }
            if (object !== null) {
                Object.entries(object).forEach(
                    function ([key, value]) {
                        if (typeof value === "object") {
                            insertObjectkeys(object, key, `${completname}-${key}`);
                        } else {
                            var elems = content.querySelectorAll(`[df-${completname}-${key}]`);
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
                            var svgPath = document.createElementNS('http://www.w3.org/2000/svg', "path");
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
        var attr = event.target.attributes;
        for (var i = 0; i < attr.length; i++) {
            if (attr[i].nodeName.startsWith('df-')) {
                var keys = attr[i].nodeName.slice(3).split("-");
                var target = this.drawflow.drawflow[this.module].data[event.target.closest(".drawflow_content_node").parentElement.id.slice(5)].data;
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
        var moduleName = this.getModuleNameFromNodeId(id);
        this.drawflow.drawflow[moduleName].data[id].data = data;

        if (this.module === moduleName) {
            const content = this.container.querySelector(`#node-${id}`);

            Object.entries(data).forEach(
                function ([key, value]) {
                    if (typeof value === "object") {
                        insertObjectkeys(null, key, key);
                    } else {
                        var elems = content.querySelectorAll(`[df-${key}]`);
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
                        function ([key, value]) {
                            if (typeof value === "object") {
                                insertObjectkeys(object, key, `${completname}-${key}`);
                            } else {
                                var elems = content.querySelectorAll(`[df-${completname}-${key}]`);
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
    }

    addNodeInput(id) {
        var moduleName = this.getModuleNameFromNodeId(id);
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
        var moduleName = this.getModuleNameFromNodeId(id);
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
        var moduleName = this.getModuleNameFromNodeId(id);
        const infoNode = this.getNodeFromId(id);
        if (this.module === moduleName) {
            this.container.querySelector(`#node-${id} .inputs .input.${input_class}`).remove();
        }

        const removeInputs = [];
        Object.keys(infoNode.inputs[input_class].connections).map(
            function (key, idx) {
                const connections = infoNode.inputs[input_class].connections[idx];
                const id_output = connections.node;
                const output_class = connections.input;
                removeInputs.push({ id_output, id, output_class, input_class });
            }
        );

        // Remove connections
        removeInputs.forEach((item) => {
            this.removeSingleConnection(item.id_output, item.id, item.output_class, item.input_class);
        });

        delete this.drawflow.drawflow[moduleName].data[id].inputs[input_class];

        // Update connection
        const connections = [];
        const connectionsInputs = this.drawflow.drawflow[moduleName].data[id].inputs;
        Object.keys(connectionsInputs).forEach((key) => connections.push(connectionsInputs[key]));

        this.drawflow.drawflow[moduleName].data[id].inputs = {};

        const input_class_id = input_class.slice(6);

        let nodeUpdates = [];
        connections.forEach((item, i) => {
            item.connections.forEach((itemx) => nodeUpdates.push(itemx));
            this.drawflow.drawflow[moduleName].data[id].inputs[`input_${i + 1}`] = item;
        });
        nodeUpdates = new Set(nodeUpdates.map(e => JSON.stringify(e)));
        nodeUpdates = Array.from(nodeUpdates).map(e => JSON.parse(e));

        if (this.module === moduleName) {
            const elems = this.container.querySelectorAll(`#node-${id} .inputs .input`);
            elems.forEach((item, i) => {
                const id_class = item.classList[1].slice(6);
                if (parseInt(input_class_id) < parseInt(id_class)) {
                    item.classList.remove('input_' + id_class);
                    item.classList.add('input_' + (id_class - 1));
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
        var moduleName = this.getModuleNameFromNodeId(id);
        const infoNode = this.getNodeFromId(id);

        if (this.module === moduleName) {
            this.container.querySelector('#node-' + id + ' .outputs .output.' + output_class).remove();
        }

        const removeOutputs = [];
        Object.keys(infoNode.outputs[output_class].connections).map(
            function (key, index) {
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
            elems.forEach((item) => {
                const id_class = item.classList[1].slice(7);
                if (parseInt(output_class_id) < parseInt(id_class)) {
                    item.classList.remove('output_' + id_class);
                    item.classList.add('output_' + (id_class - 1));
                }
            });
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
        const index_out = module.data[idOutput].outputs[classOutput].connections.findIndex(
            (item) => item.node === idInput && item.output === classInput
        );
        module.data[idOutput].outputs[classOutput].connections.splice(index_out, 1);

        const index_in = module.data[idInput].inputs[classInput].connections.findIndex(
            (item) => item.node === idOutput && item.input === classOutput
        );
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
        var exists = module.data[idOutput].outputs[classOutput].connections.findIndex(
            (item) => item.node == idInput && item.output === classInput
        );
        if (exists <= -1) {
            return false;
        }

        if (this.module === nodeOneModule) {
            // In same module with view.
            this.container.querySelector(`.connection.node_in_node-${idInput}.node_out_node-${idOutput}.${classOutput}.${classInput}`).remove();
        }

        var outIndex = module.data[idOutput].outputs[classOutput].connections.findIndex(
            (item) => item.node == idInput && item.output === classInput
        );
        module.data[idOutput].outputs[classOutput].connections.splice(outIndex, 1);

        var inIndex = module.data[idInput].inputs[classInput].connections.findIndex(
            (item) => item.node == idOutput && item.input === classOutput
        );
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

            const index_in = module.data[inputId].inputs[inputClass].connections.findIndex(
                (item) => item.node === outputId && item.input === outputClass
            );
            module.data[inputId].inputs[inputClass].connections.splice(index_in, 1);

            const index_out = module.data[outputId].outputs[outputClass].connections.findIndex(
                (item) => item.node === inputId && item.output === inputClass
            );
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

            const indexOut = module.data[outputId].outputs[outputClass].connections.findIndex(
                (item) => item.node === inputId && item.output === inputClass
            );
            module.data[outputId].outputs[outputClass].connections.splice(indexOut, 1);

            const indexIn = module.data[inputId].inputs[inputClass].connections.findIndex(
                (item) => item.node === outputId && item.input === outputClass
            );
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
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

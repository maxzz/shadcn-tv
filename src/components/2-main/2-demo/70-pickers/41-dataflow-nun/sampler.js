import dataToImport from './sampler-data.js';

var id = document.getElementById("drawflow");
const editor = new Drawflow(id);
editor.reroute = true;

editor.start();
editor.import(dataToImport);

/*
var welcome = `
<div>
  <div class="title-box">👏 Welcome!!</div>
  <div class="box">
    <p>Simple flow library <b>demo</b>
    <a href="https://github.com/jerosoler/Drawflow" target="_blank">Drawflow</a> by <b>Jero Soler</b></p><br>

    <p>Multiple input / outputs<br>
       Data sync nodes<br>
       Import / export<br>
       Modules support<br>
       Simple use<br>
       Type: Fixed or Edit<br>
       Events: view console<br>
       Pure Javascript<br>
    </p>
    <br>
    <p><b><u>Shortkeys:</u></b></p>
    <p>🎹 <b>Delete</b> for remove selected<br>
    💠 Mouse Left Click == Move<br>
    ❌ Mouse Right == Delete Option<br>
    🔍 Ctrl + Wheel == Zoom<br>
    📱 Mobile support<br>
    ...</p>
  </div>
</div>
`;
*/

//editor.addNode(name, inputs, outputs, posx, posy, class, data, html);
//editor.addNode('welcome', 0, 0, 50, 50, 'welcome', {}, welcome ); editor.addModule('Other');

// Events!
editor.on('nodeCreated', function (id) {
    console.log("Node created " + id);
});

editor.on('nodeRemoved', function (id) {
    console.log("Node removed " + id);
});

editor.on('nodeSelected', function (id) {
    console.log("Node selected " + id);
});

editor.on('moduleCreated', function (name) {
    console.log("Module Created " + name);
});

editor.on('moduleChanged', function (name) {
    console.log("Module Changed " + name);
});

editor.on('connectionCreated', function (connection) {
    console.log('Connection created');
    console.log(connection);
});

editor.on('connectionRemoved', function (connection) {
    console.log('Connection removed');
    console.log(connection);
});

editor.on('mouseMove', function (position) {
    console.log('Position mouse x:' + position.x + ' y:' + position.y);
});

editor.on('nodeMoved', function (id) {
    console.log("Node moved " + id);
});

editor.on('zoom', function (zoom) {
    console.log('Zoom level ' + zoom);
});

editor.on('translate', function (position) {
    console.log('Translate x:' + position.x + ' y:' + position.y);
});

editor.on('addReroute', function (id) {
    console.log("Reroute added " + id);
});

editor.on('removeReroute', function (id) {
    console.log("Reroute removed " + id);
});

/* DRAG EVENT */

/* Mouse and Touch Actions */

var elements = document.getElementsByClassName('drag-drawflow');
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('touchend', drop, false);
    elements[i].addEventListener('touchmove', positionMobile, false);
    elements[i].addEventListener('touchstart', drag, false);
}

var mobile_item_selec = '';
var mobile_last_move = null;
function positionMobile(ev) {
    mobile_last_move = ev;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if (ev.type === "touchstart") {
        mobile_item_selec = ev.target.closest(".drag-drawflow").getAttribute('data-node');
    } else {
        ev.dataTransfer.setData("node", ev.target.getAttribute('data-node'));
    }
}

function drop(ev) {
    if (ev.type === "touchend") {
        var parentdrawflow = document.elementFromPoint(mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow");
        if (parentdrawflow != null) {
            addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY);
        }
        mobile_item_selec = '';
    } else {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("node");
        addNodeToDrawFlow(data, ev.clientX, ev.clientY);
    }

}

function addNodeToDrawFlow(name, x, y) {
    if (editor.editor_mode === 'fixed') {
        return false;
    }

    const elm = editor.canvas;
    const rect = elm.getBoundingClientRect();
    const w = elm.clientWidth;
    const h = elm.clientHeight;

    x = x * (w / (w * editor.zoom)) - (rect.x * (w / (w * editor.zoom)));
    y = y * (h / (h * editor.zoom)) - (rect.y * (h / (h * editor.zoom)));

    switch (name) {
        case 'facebook':
            var facebook = `
                <div>
                    <div class="title-box"><i class="fab fa-facebook"></i> Facebook Message</div>
                </div>
                `;
            editor.addNode('facebook', 0, 1, x, y, 'facebook', {}, facebook);
            break;
        case 'slack':
            var slackchat = `
                <div>
                    <div class="title-box"><i class="fab fa-slack"></i> Slack chat message</div>
                </div>
                `;
            editor.addNode('slack', 1, 0, x, y, 'slack', {}, slackchat);
            break;
        case 'github':
            var githubtemplate = `
                <div>
                    <div class="title-box"><i class="fab fa-github "></i> Github Stars</div>
                    <div class="box">
                        <p>Enter repository url</p>
                        <input type="text" df-name>
                    </div>
                </div>
                `;
            editor.addNode('github', 0, 1, x, y, 'github', {
                "name": ''
            }, githubtemplate);
            break;
        case 'telegram':
            var telegrambot = `
                <div>
                    <div class="title-box"><i class="fab fa-telegram-plane"></i> Telegram bot</div>
                    <div class="box">
                        <p>Send to telegram</p>
                        <p>select channel</p>
                        <select df-channel>
                            <option value="channel_1">Channel 1</option>
                            <option value="channel_2">Channel 2</option>
                            <option value="channel_3">Channel 3</option>
                            <option value="channel_4">Channel 4</option>
                        </select>
                    </div>
                </div>
                `;
            editor.addNode('telegram', 1, 0, x, y, 'telegram', { "channel": 'channel_3' }, telegrambot);
            break;
        case 'aws':
            var aws = `
                <div>
                    <div class="title-box"><i class="fab fa-aws"></i> Aws Save </div>
                    <div class="box">
                        <p>Save in aws</p>
                        <input type="text" df-db-dbname placeholder="DB name"><br><br>
                        <input type="text" df-db-key placeholder="DB key">
                        <p>Output Log</p>
                    </div>
                </div>
                `;
            editor.addNode('aws', 1, 1, x, y, 'aws', { "db": { "dbname": '', "key": '' } }, aws);
            break;
        case 'log':
            var log = `
                <div>
                    <div class="title-box"><i class="fas fa-file-signature"></i> Save log file </div>
                </div>
                `;
            editor.addNode('log', 1, 0, x, y, 'log', {}, log);
            break;
        case 'google':
            var google = `
                <div>
                    <div class="title-box"><i class="fab fa-google-drive"></i> Google Drive save </div>
                </div>
                `;
            editor.addNode('google', 1, 0, x, y, 'google', {}, google);
            break;
        case 'email':
            var email = `
                <div>
                    <div class="title-box"><i class="fas fa-at"></i> Send Email </div>
                </div>
                `;
            editor.addNode('email', 1, 0, x, y, 'email', {}, email);
            break;

        case 'template':
            var template = `
                <div>
                    <div class="title-box"><i class="fas fa-code"></i> Template</div>
                        <div class="box">
                            Ger Vars
                            <textarea df-template></textarea>
                            Output template with vars
                        </div>
                    </div>
                `;
            editor.addNode('template', 1, 1, x, y, 'template', { "template": 'Write your template' }, template);
            break;
        case 'multiple':
            var multiple = `
                <div>
                    <div class="box">
                        Multiple!
                    </div>
                </div>
                `;
            editor.addNode('multiple', 3, 4, x, y, 'multiple', {}, multiple);
            break;
        case 'personalized':
            var personalized = `
                <div>
                    Personalized
                </div>
                `;
            editor.addNode('personalized', 1, 1, x, y, 'personalized', {}, personalized);
            break;
        case 'dbclick':
            var dbclick = `
                <div>
                    <div class="title-box"><i class="fas fa-mouse"></i> Db Click</div>
                    <div class="box dbclickbox" ondblclick="showpopup(event)">
                        Db Click here
                        <div class="modal" style="display:none">
                            <div class="modal-content">
                                <span class="close" onclick="closemodal(event)">&times;</span>
                                Change your variable {name} !
                                <input type="text" df-name>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            editor.addNode('dbclick', 1, 1, x, y, 'dbclick', { name: '' }, dbclick);
            break;
        default:
    }
}

var transform = '';

function showpopup(e) {
    e.target.closest(".drawflow-node").style.zIndex = "9999";
    e.target.children[0].style.display = "block";
    //document.getElementById("modalfix").style.display = "block";

    //e.target.children[0].style.transform = 'translate('+translate.x+'px, '+translate.y+'px)';
    transform = editor.canvas.style.transform;
    editor.canvas.style.transform = '';
    editor.canvas.style.left = editor.canvas_x + 'px';
    editor.canvas.style.top = editor.canvas_y + 'px';
    console.log(transform);

    //e.target.children[0].style.top  =  -editor.canvas_y - editor.container.offsetTop +'px';
    //e.target.children[0].style.left  =  -editor.canvas_x  - editor.container.offsetLeft +'px';
    editor.editor_mode = "fixed";
}

function closemodal(e) {
    e.target.closest(".drawflow-node").style.zIndex = "2";
    e.target.parentElement.parentElement.style.display = "none";
    //document.getElementById("modalfix").style.display = "none";
    editor.canvas.style.transform = transform;
    editor.canvas.style.left = '0px';
    editor.canvas.style.top = '0px';
    editor.editor_mode = "edit";
}

function changeModule(event) {
    var all = document.querySelectorAll(".menu ul li");
    for (var i = 0; i < all.length; i++) {
        all[i].classList.remove('selected');
    }
    event.target.classList.add('selected');
}

function changeMode(option) {
    //console.log(lock.id);
    if (option == 'lock') {
        lock.style.display = 'none';
        unlock.style.display = 'block';
    } else {
        lock.style.display = 'block';
        unlock.style.display = 'none';
    }
}

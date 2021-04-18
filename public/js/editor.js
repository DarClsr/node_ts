
class IwanEditor {
    constructor(id = "editor", width = "100vw", height = 300) {
        this.context = document.getElementById(id);
        this.themeClassName = "white";
        this.toolBars = [
            {
                name: "B",
                value: "bold"
            },
            {
                name: "U",
                value: "underline"
            },

            {
                name: "I",
                value: "italic"
            },
            {
                name: "img",
                value: "insertImage",
                extend: true,
            },
            {
                name: "ul",
                value: "insertOrderedList"
            },
            {
                name: "ol",
                value: "insertUnorderedList"
            },
            {
                name: "link",
                value: "createLink",
                extend: true,
            },
            {
                name:"撤销",
                value:"undo"
            },
            {
                name:"回复",
                value:"redo"
            },
            {
                name:"缩进",
                value:"indent",
            },
            {
                name:"前进",
                value:"outdent"
            }


        ];
        this.initContext(width, height);
        this.themeBox = {};
        this.themeText = {};
    }
    initThemeText() {
        this.themeText = document.createElement("span");
        this.themeText.innerText = this.themeClassName === "white" ? "light" : "dark";
    }

    initThemeBtn() {
        this.themeBox = document.createElement("div");
        const themeBtn = document.createElement("input")
        themeBtn.type = "checkbox";
        let that = this;
        themeBtn.addEventListener("change", function (e) {
            if (this.checked) {
                that.themeClassName = "black";
            } else {
                that.themeClassName = "white"
            }
            that.context.className = that.themeClassName;
            that.initThemeText();

        })
        this.initThemeText();
        this.themeBox.appendChild(themeBtn);
        this.themeBox.appendChild(this.themeText);
        this.themeBox.className = "theme-btn";
    }


    initContext(width, height) {
        this.context.style.width = width;
        this.context.style.height = height + "px";
        this.context.className = this.themeClassName;
        this.initToolBar();
        this.initEditorContext()
    }

    initToolBar() {
        let toolBar = document.createElement("div");
        toolBar.className = "toolbar";
        this.toolBars.forEach(v => {
            let btn = document.createElement("button");
            btn.innerText = v.name;
            btn.className = "tool-btn";
            btn.setAttribute("data-edit", v.value);
            btn.addEventListener("click", (e) => {
                this.editMain({ e, value: v.value, extend: v.extend })
            })
            toolBar.appendChild(btn)
        })

        this.initThemeBtn();
        toolBar.appendChild(this.themeBox);
        this.context.appendChild(toolBar);
    }

    createLink(value) {
        let link = prompt('请输入链接', "");
        if (link) {
            console.log(value, link)
            document.execCommand(value, false, link)

        }
    }

    editMain({ value, extend }) {
        let select = document.getSelection();
        let text = select.toString();
        // if (!text) {
        //     console.log("no seelcted Text")
        //     return;

        if (!extend) {
            document.execCommand(value, false, null);
        } else {
            this[value](value)
        }
    }

    insertImage() {
        console.log("sert")
        let link = 'http://127.0.0.1:3000/img/01.jpg';
        const img = `<p contentEditable="${true}" a="3" class="image"><img align-type="right" src="${link}" cla alt="image" width="100" /></p>`
        document.execCommand("insertHtml", false, img);
    }



    initEditorContext() {
        let editorContext = document.createElement("div");
        editorContext.className = "editor-content";
        editorContext.contentEditable = "true";
        this.context.appendChild(editorContext);
    }
}
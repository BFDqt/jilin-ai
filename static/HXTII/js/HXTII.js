/**
 * 
 * @authors LuanHaixin (2534910946@qq.com)
 * @date    2022-02-10 16:29:04
 * @version $Id$
 */

//window.HXTS = new HXT({ id: "HXT", content: content, plugin: [{ "name": "titleFolder", "data": { "level": 2 } }] })

Array.prototype.diff = function(a) {
    return this.filter(function(i) { return a.indexOf(i) < 0; });
};

Array.prototype.intersection = function(a) {
    return this.filter(function(i) { return a.indexOf(i) !== -1; });
};

Array.prototype.duplicateRemoval = function() {
    var arr = new Array(); //定义一个临时数组 
    for (var i = 0; i < this.length; i++) { //循环遍历当前数组 
        //判断当前数组下标为i的元素是否已经保存到临时数组 
        //如果已保存，则跳过，否则将此元素保存到临时数组中 
        if (arr.indexOf(this[i]) == -1) {
            arr.push(this[i]);
        }
    }
    return arr;
}
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
    return val
};


//两个获取元素的方法 $$ $C$
function $$(id) {
    var el = document.getElementById(id);
    return el;
}

function $C$(Class) {
    var el = document.getElementsByClassName(Class);
    return el;
}

function $E$C(el, Class) {
    var el1 = el.getElementsByClassName(Class);
    return el1;
}

function $T$(Tag) {
    var el = document.getElementsByTagName(Tag);
    return el;
}
//有关类名字的方法 太常用就不写到tools里面了
function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

function hasClass(el, className) {
    // \s匹配任何空白字符，包括空格、制表符、换页符等等
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

function removeClass(el, className) {
    if (!hasClass(el, className)) {
        return;
    }
    let newClass = el.className.split(' ');
    newClass.forEach(function(val, index, newClass) {
        if (val === className) {
            newClass.splice(index, 1);
        }
    });
    el.className = newClass.join(' ');
}

function classList(el) {
    if (el.className == undefined || el.className == null || el.className == "") {
        return [];
    }
    return el.className.split(' ');
}

function addClasses(cls1, cls2) {
    for (var i = 0; i < $C$(cls1).length; i++) {
        addClass($C$(cls1)[i], cls2);
    }
}

function removeClasses(cls1, cls2) {
    for (var i = 0; i < $C$(cls1).length; i++) {
        removeClass($C$(cls1)[i], cls2);
    }
}

var tools = {}
tools.HTMLEncode = function(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&amp;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");

    return s;
}

tools.cloneObj = function(obj) { // 对象复制
    return JSON.parse(JSON.stringify(obj))
}


function entries(obj) {
    let arr = [];
    for (let key of Object.keys(obj)) {
        arr.push([key, obj[key]]);
    }
    return arr;
}

function HXTII(option) {
    // 自用函数
    Array.prototype.diff = function(a) {
        return this.filter(function(i) { return a.indexOf(i) < 0; });
    };

    Array.prototype.intersection = function(a) {
        return this.filter(function(i) { return a.indexOf(i) !== -1; });
    };

    Array.prototype.duplicateRemoval = function() {
        var arr = new Array(); //定义一个临时数组 
        for (var i = 0; i < this.length; i++) { //循环遍历当前数组 
            //判断当前数组下标为i的元素是否已经保存到临时数组 
            //如果已保存，则跳过，否则将此元素保存到临时数组中 
            if (arr.indexOf(this[i]) == -1) {
                arr.push(this[i]);
            }
        }
        return arr;
    }

    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
        return val
    };


    //两个获取元素的方法 $$ $C$
    function $$(id) {
        var el = document.getElementById(id);
        return el;
    }

    function $C$(Class) {
        var el = document.getElementsByClassName(Class);
        return el;
    }

    function $E$C(el, Class) {
        var el1 = el.getElementsByClassName(Class);
        return el1;
    }

    function $T$(Tag) {
        var el = document.getElementsByTagName(Tag);
        return el;
    }
    //有关类名字的方法 太常用就不写到tools里面了
    function addClass(el, className) {
        if (hasClass(el, className)) {
            return;
        }
        let newClass = el.className.split(' ');
        newClass.push(className);
        el.className = newClass.join(' ');
    }

    function hasClass(el, className) {
        // \s匹配任何空白字符，包括空格、制表符、换页符等等
        let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
        return reg.test(el.className);
    }

    function removeClass(el, className) {
        if (!hasClass(el, className)) {
            return;
        }
        let newClass = el.className.split(' ');
        newClass.forEach(function(val, index, newClass) {
            if (val === className) {
                newClass.splice(index, 1);
            }
        });
        el.className = newClass.join(' ');
    }

    function classList(el) {
        if (el.className == undefined || el.className == null || el.className == "") {
            return [];
        }
        return el.className.split(' ');
    }

    function addClasses(cls1, cls2) {
        for (var i = 0; i < $C$(cls1).length; i++) {
            addClass($C$(cls1)[i], cls2);
        }
    }

    function removeClasses(cls1, cls2) {
        for (var i = 0; i < $C$(cls1).length; i++) {
            removeClass($C$(cls1)[i], cls2);
        }
    }


    //合并一个二维数组 前提是升序排好的 与orderArrA1合用


    //生成一个连续的数组已准备取交集
    function arrList2(arr) {
        var array = [];
        for (var i = 0; i < arr.length; i++) {
            for (var j = arr[i][0]; j <= arr[i][1]; j++) {
                array.push(j);
            }
        }
        return array;
    }

    function listArr2(arr) {
        if (arr.length == 1) {
            return array = [
                [arr[0], arr[0]]
            ];
        }
        var array = [];
        var arrayChild = [];
        arrayChild.push(arr[0]);
        for (var i = 0; i < arr.length - 1; i++) {
            arrayChild.push(arr[i + 1]);
            if (arr[i + 1] - 1 == arr[i]) {
                if (i != arr.length - 2) {
                    arrayChild.pop();
                } else {
                    array.push(arrayChild);
                }

            }
            if (arr[i + 1] - 1 != arr[i]) {
                arrayChild.pop();
                arrayChild.push(arr[i]);
                array.push(arrayChild);
                arrayChild = [];
                if (i != arr.length - 2) {
                    arrayChild.push(arr[i + 1]);

                } else {
                    arrayChild.push(arr[i + 1]);
                    arrayChild.push(arr[i + 1]);
                    array.push(arrayChild);
                }

            }
        }

        return array;
    }

    //合并一个二维数组 前提是升序排好的 与orderArrA1合用
    function charArrToGapArr1(arr) {

        return [arr[0], arr[1] + 1];

    }

    function gapArrToCharArr1(arr) {

        return [arr[0], arr[1] - 1];

    }


    function charArrToGapArr2(arr) {

        var anr = []
        for (var i = 0; i < arr.length; i++) {
            anr.push(charArrToGapArr1(arr[i]))
        }
        return anr

    }

    function gapArrToCharArr2(arr) {
        var anr = []
        for (var i = 0; i < arr.length; i++) {
            anr.push(gapArrToCharArr1(arr[i]))
        }
        return anr

    }


    function rangeDiffRange(range1, range2) {
        return charArrToGapArr2(listArr2(arrList2(gapArrToCharArr2(range1)).diff(arrList2(gapArrToCharArr2(range2)))))
    }



    // HXTII 区
    let that = this
    this.versin = "v3.0";
    this.parent = option.el
    this.content = option.content || []
    this.plugin = option.plugin || []
    this.markdown = option.markdown || false
    this.markdownContent = option.markdownContent || "";
    this.renderComplete = false
    this.renderCompleteFunc = option.renderComplete || function() {}


    HXTII.MathJax = {

        loader: {
            source: {
                '[tex]/AMScd': '[tex]/amscd',
                '[tex]/AMDcd': '[tex]/amscd',
                '[tex]/AMSmath': '[tex]/amscd',
            }
        },

        tex: {
            inlineMath: [
                ['$', '$'],
                ['\\(', '\\)']
            ],
            displayMath: [
                ['$$', '$$'],
                ['\\[', '\\]']
            ],
            // packages: { '[+]': ['ams'] },
            processEscapes: true, // use \$ to produce a literal dollar sign
            processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
            processRefs: true, // process \ref{...} outside of math mode
            digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
            // pattern for recognizing numbers
            tags: 'all', // or 'ams' or 'all'
            tagSide: 'right', // side for \tag macros
            tagIndent: '0.8em', // amount to indent tags
            useLabelIds: true, // use label name rather than tag for ids
            maxMacros: 1000, // maximum number of macro substitutions per expression
            maxBuffer: 5 * 1024, // maximum size for the internal TeX string (5K)

        },
        svg: {
            fontCache: 'global'
        },
        options: {
            enableMenu: true,
            autoload: false,
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'code', 'a'],
            renderActions: {
                assistiveMml: [], // disable assistive mathml
            },
            menuOptions: {
                settings: {
                    assistiveMml: false
                }
            }
        },
        chtml: {
            scale: 1,
        },

        startup: {
            typeset: false,
            ready: () => {
                window.MathJax.startup.defaultReady();
                window.MathJax.startup.promise.then(() => {
                    console.log('MathJax initial typesetting complete');
                });
            },
            pageReady: () => {
                return MathJax.startup.defaultPageReady().then(() => {
                    console.log('MathJax initial typesetting complete');
                })
            },
        },
    };

    // window.HXTIIMathJaxLoad = false;

    HXTII.loadHXTIIDependence = HXTII.loadHXTIIDependence ? true : false
    HXTII.loadMarkdownDependence = HXTII.loadMarkdownDependence ? true : false

    HXTII.moduleDependenceLoaded = []

    HXTII.HXTIIDependence = {
        js: [],
        css: [
           "https://2023.igem.wiki/jilin-china/static/HXTII/css/HXTII.css",
           "https://2023.igem.wiki/jilin-china/static/HXTII/css/common.css"

        ]
    }


    if (this.markdown) {

        HXTII.HXTIIDependence = {
            js: ["https://cdnjs.cloudflare.com/ajax/libs/marked/5.1.1/marked.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js",
                // "https://2023.igem.wiki/jilin-china/static/HXTII/lib/highlight/highlight.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg-full.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/perfect-scrollbar.min.js",
            ],
            css: [
                "https://2023.igem.wiki/jilin-china/static/HXTII/css/HXTII.css",
                "https://2023.igem.wiki/jilin-china/static/HXTII/css/common.css",
                "https://2023.igem.wiki/jilin-china/static/HXTII/lib/highlight/highlight.min.css",
                "https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/css/perfect-scrollbar.min.css",
                "https://2023.igem.wiki/jilin-china/static/HXTII/css/bamboo.css"
            ]
        }

    }

    HXTII.moduleDependence = {
        text: {
            js: ["https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg-full.min.js"],
            css: []
        },
        html: {
            js: [],
            css: []
        },
        image: {
            js: [],
            css: []
        },
        sound: {
            js: ["https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.js"],
            css: ["https://cdnjs.cloudflare.com/ajax/libs/aplayer/1.10.1/APlayer.min.css"]
        },
        video: {
            js: ["https://cdnjs.cloudflare.com/ajax/libs/video.js/7.17.0/video.min.js"],
            css: ["https://cdnjs.cloudflare.com/ajax/libs/video.js/7.17.0/video-js.min.css"]
        },
        code: {
            js: ["https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/perfect-scrollbar.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/highlight.min.js"
            ],
            css: ["https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/css/perfect-scrollbar.min.css",
                "https://2023.igem.wiki/jilin-china/static/HXTII/lib/highlight/highlight.min.css"
            ]
        },
        formula: {
            js: ["https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg-full.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/perfect-scrollbar.min.js"
            ],
            css: ["https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/css/perfect-scrollbar.min.css"]
        },

    }
    // https://cdn.bootcdn.net/ajax/libs/mathjax/3.2.2/es5/tex-svg-full.js
    HXTII.pluginDependence = {}


    // 默认用cdn了，cdn不行在用本地的 highlight.css自能用我提供的，因为是我改过的

    /*
        this.dependenceJs = [
            // "lib/videojs/video.min.js",
            "lib/APlayer/APlayer.min.js",
            "lib/highlight/highlight.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg-full.min.js",
            "lib/perfectScrollbar/perfect-scrollbar.min.js"
        ]

        this.dependenceCss = [
            "css/HXTII.css",
            "css/common.css",
            "lib/perfectScrollbar/perfect-scrollbar.css",
            "lib/APlayer/APlayer.min.css",
            "lib/videojs/video-js.min.css",
            "lib/highlight/styles/highlight.min.css"
        ]*/


    try {
        HXTII.environment = HXTIIEDR.INFO.getInfo("environment")
    } catch {
        HXTII.environment = "client"
    }


    this.INFO = {}
    this.INFO.outBlockId = 0

    this.getInfo = (attr) => {
        return this.INFO[attr]
    }

    this.getInfoAndDeal = (attr, num) => {
        var res = this.INFO[attr]
        this.INFO[attr] += num
        return res
    }
    this.setInfo = (attr, value) => {
        this.INFO[attr] = value
    }


    this.hxt = document.createElement("div");

    this.parent.innerHTML = ""
    this.parent.appendChild(this.hxt)



    this.newOutBox = () => {

        var that = this
        var el = document.createElement("div")

        el.setAttribute("titlegrade", "outBlockT0")
        el.setAttribute("outerblock-id", this.getInfoAndDeal("outBlockId", 1))

        addClass(el, "hxtii-outerblock")

        var inBC = document.createElement("div")

        el.inBC = inBC

        addClass(inBC, "hxtii-innerblock-c")

        el.append(inBC)

        return el

    }
    this.changeOuterBoxTitleGrade = (el, titleGrage) => {

        removeClass(el, el.getAttribute("titlegrade"))

        el.setAttribute("titlegrade", titleGrage)

        addClass(el, titleGrage)
    }

    this.computeTitleGrade = (titleGrage) => {
        var num = parseInt(titleGrage.slice(9))

        if (titleGrage.slice(8, 9) == "W") {
            num += 0.5
            return num
        } else {
            return num
        }

    }

    this.returnTitleGrade = (num) => {

        var num1 = parseInt(num)

        if (num1 == num) {
            return "outBlockT" + num
        } else {
            return "outBlockW" + num1
        }

    }

    this.returnTitleGradeText = (num) => {

        if (num == 0) {
            return ""
        } else {
            var num1 = parseInt(num)

            if (num1 == num) {
                if (num1 == 1) {
                    return num1 + "级<br>标题"
                }
                return num1 + "级标题"
            } else {
                return num1 + "级正文"
            }
        }

    }

    this.newInnerBox = () => {

        var el = document.createElement("div")
        addClass(el, "hxtii-innerblock")

        var inC = document.createElement("div")
        addClass(inC, "hxtii-innerblock-cc")
        el.inC = inC;
        el.appendChild(inC)

        return el
    }


    this.newInnerImageBox = (url) => {
        var dom = document.createElement("div")
        addClass(dom, "hxtii-innerblock-image hxtii-innerblock-media")
        dom.option = { url: [{ src: url }] }
        dom.innerHTML = '<div class="hxtii-innerblock-media-rc hxtii-innerblock-image-rc hxtii-innerblock-adjust "><img src="' + url + '" alt=""></div>'
        return dom
    }

    this.newInnerVideoBox = (url) => {
        var dom = document.createElement("div")
        addClass(dom, "hxtii-innerblock-video hxtii-innerblock-media")
        dom.innerHTML = '<div class="hxtii-innerblock-media-rc hxtii-innerblock-video-rc hxtii-innerblock-adjust"><video class="video-js hxt-video" width="100%" height=""  controls ></video></div>'


        comp = dom.getElementsByClassName("hxt-video")[0]
        dom.option = {
            sources: url,
            playbackRates: [0.5, 1, 1.5, 2, 5],
            preload: "metadata",
            autoplay: false,
            muted: true,
            inactivityTimeout: 5000,
            controlBar: {
                fullscreenToggle: false,
                pictureInPictureToggle: false,

            }
        }
        dom.player = videojs(comp, dom.option, function onPlayerReady() {
            videojs.log('Your player is ready!');

            // In this context, `this` is the player that was created by Video.js.
            // this.play();

            // How about an event listener?
            this.on('ended', function() {
                videojs.log('Awww...over so soon?!');
            });
        })

        HXTIIEDR.INFO.media.videoBoxCount++
        return dom
    }

    this.newInnerAudioBox = (url) => {
        var dom = document.createElement("div")
        addClass(dom, "hxtii-innerblock-sound hxtii-innerblock-media")
        dom.innerHTML = '<div class="hxtii-innerblock-media-rc hxtii-innerblock-sound-rc hxtii-innerblock-adjust"><div class="hxt-sound"></div></div>'

        comp = dom.getElementsByClassName("hxt-sound")[0]

        dom.option = {
            container: comp,
            audio: url
        }

        dom.aPlayer = new APlayer(dom.option);
        $E$C(dom, "aplayer-pic")[0].style.backgroundImage = "var(--img-sound)"

        return dom
    }

    this.newInnerTextBox = () => {

        var el = document.createElement("div")
        addClass(el, "hxtii-innerblock-text")
        addClass(el, "textbox")

        var c = document.createElement("div")
        addClass(c, "hxtii-innerblock-text-c")

        c.inT = el
        c.appendChild(el)

        return c
    }




    this.newInnerCodeBox = ({ cont = "", lang = "javascript", theme = "monokai-sublime" }) => {

        var showEl = document.createElement("div")
        addClass(showEl, "codebox")
        addClass(showEl, "code-show")
        addClass(showEl, "hljs")
        showEl.codeLang = lang
        showEl.codeTheme = theme
        addClass(showEl, "language-" + showEl.codeLang)
        addClass(showEl, showEl.codeTheme)
        showEl.innerHTML = hljs.highlight(cont, { language: showEl.codeLang }).value;


        return showEl
    }

    this.newhxtCodeBox = (option) => {

        var el = document.createElement("div")
        addClass(el, "hxt-code")

        el.innerHTML = `<div class="hxt-code-code-cont">
                            <div class="hxt-code-code-cc"></div>
                        </div>
                        <div class="hxt-code-menu-cont">
                            <div class="hxt-code-menu-select-c hxt-code-menu-language no-select">${option.lang}</div>
                            <div class="hxt-code-menu-select-c hxt-code-menu-theme no-select">${option.theme}</div>
                        </div>
                        <div class="hxt-code-bar">
                            C<br>O<br>D<br>E
                        </div>`


        el.codeCont = $E$C(el, "hxt-code-code-cc")[0]

        el.showEl = this.newInnerCodeBox(option)

        el.codeCont.appendChild(el.showEl)

        el.langMenuBtn = $E$C(el, "hxt-code-menu-language")[0]
        el.themeMenuBtn = $E$C(el, "hxt-code-menu-theme")[0]

        let TL = this.codeThemeBox
        let LL = this.codeLangBox

        return el
    }

    this.addhxtCodeBoxTo = (el, option) => {

        var xel = document.createElement("div")
        addClass(xel, "hxtii-innerblock-code hxtii-innerblock-advanced")
        var zel = document.createElement("div")
        addClass(zel, "hxtii-innerblock-advanced-rc hxtii-innerblock-code-rc hxtii-innerblock-adjust")
        zel.style.width = "100%";
        xel.appendChild(zel)


        let cob = this.newhxtCodeBox(option)

        zel.appendChild(cob)

        el.appendChild(xel)

        let p5s = new PerfectScrollbar(cob.codeCont, { wheelSpeed: 2, wheelPropagation: true, minScrollbarLength: 20 });
    }


    this.newhxtFormulaBox = ({ cont = "" }) => {
        var el = document.createElement("div")
        addClass(el, "hxt-formula")

        // HXTIIEDR.INFO.selectCodeBox = el
        el.innerHTML = `<div class="hxt-formula-formula-cont">
                        </div>`

        el.formulaCont = $E$C(el, "hxt-formula-formula-cont")[0]

        let svg = MathJax.tex2svg(cont, { em: 12, ex: 6, display: false });
        el.formulaCont.innerHTML = ""
        el.formulaCont.appendChild(svg)


        return el

    }

    this.addhxtFormulaBoxTo = (el, option) => {
        var xel = document.createElement("div")
        addClass(xel, "hxtii-innerblock-formula hxtii-innerblock-advanced")
        var zel = document.createElement("div")
        addClass(zel, "hxtii-innerblock-advanced-rc hxtii-innerblock-formula-rc hxtii-innerblock-adjust")
        zel.style.width = "100%";
        xel.appendChild(zel)


        let cob = this.newhxtFormulaBox(option)

        zel.appendChild(cob)

        el.appendChild(xel)

        let p5s = new PerfectScrollbar(cob.formulaCont, { suppressScrollY: true, wheelSpeed: 2, wheelPropagation: true, minScrollbarLength: 20 });

    }

    let hxtiiTextTag = {
        withoutValue: ["i", "b", "u", "st", "sp", "sb"],
        withValue: ["bg", "c", "fs", "f", "l"],
        withColorValue: ["bg", "c"],
        hTTReflexDom: { "i": "i", "b": "b", "l": "a", "u": "u", "st": "strike", "sb": "sub", "sp": "sup", "bg": "font", "c": "font", "fs": "font", "f": "font", "br": "br" }
    }





    this.textFunc = {

        renderByMathjax: (el) => {
            // mathjax初始化后才会注入version
            if (!window.MathJax.version) {
                return
            }
            if (el && !Array.isArray(el)) {
                el = [el]
            }


            return window.MathJax.typesetPromise(el)


        },
        HTMLEncode: (str) => {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&/g, "&amp;");
            s = s.replace(/</g, "&lt;");
            s = s.replace(/>/g, "&gt;");
            s = s.replace(/ /g, "&nbsp;");
            s = s.replace(/\'/g, "&#39;");
            s = s.replace(/\"/g, "&quot;");
            s = s.replace(/\n/g, "<br>");

            return s;
        },


        globalDiffTDL: (arr, TDL, clearLink = false) => {

            let dealRange = arr

            for (let [key, value] of entries(TDL)) {

                if (key == "l") {
                    if (clearLink) {

                        for (let j = 0; j < value.length; j++) {
                            let rangeArr = value[j].slice(2)
                            let tagValue = value[j].slice(0, 2)

                            let resArr = rangeDiffRange(rangeArr, dealRange)

                            resArr.unshift(...tagValue)

                            TDL[key][j] = resArr
                        }

                    }


                    continue;

                }

                if (hxtiiTextTag.withoutValue.indexOf(key) != -1) {
                    TDL[key] = rangeDiffRange(value, dealRange)


                    continue

                }

                if (hxtiiTextTag.withValue.indexOf(key) != -1) {

                    for (let j = 0; j < value.length; j++) {


                        let rangeArr = value[j].slice(1)
                        let tagValue = value[j].slice(0, 1)

                        let resArr = rangeDiffRange(rangeArr, dealRange)

                        resArr.unshift(...tagValue)
                        TDL[key][j] = resArr

                    }

                }

            }


            TDL = this.textFunc.deleteEmptyValue(TDL)

            return TDL
        },
        deleteEmptyValue: (TDL) => {

            for (let [key, value] of entries(TDL)) {

                if (hxtiiTextTag.withValue.indexOf(key) != -1) {

                    if (key != "l") {
                        for (let j = 0; j < value.length; j++) {
                            if (value[j].length == 1) {
                                value.remove(value[j])
                            }
                        }
                    } else {

                        for (let j = 0; j < value.length; j++) {
                            if (value[j].length == 2) {
                                value.remove(value[j])
                            }
                        }
                        if (value.length == 0) {
                            delete TDL["l"];
                        }



                    }

                }


            }

            for (let [key, value] of entries(TDL)) {
                if (value.length == 0) {
                    delete TDL[key];
                }
            }

            return TDL

        },
        compareTwoArrInterAction: (arr1, arr2) => {
            //返回 相交状态 3相等 2包括 1半相交 0无关
            //两个数组 大的在1，小的在2
            if (arr1[0] == arr2[0] && arr1[1] == arr2[1]) {

                return [3, arr1, arr2]
            }
            if (arr1[1] <= arr2[0]) {

                return [0, arr2, arr1]
            }

            if (arr1[0] >= arr2[1]) {

                return [0, arr1, arr2]
            }

            if (arr1[0] >= arr2[0] && arr1[1] <= arr2[1]) {
                return [2, arr2, arr1]
            }

            if (arr1[0] <= arr2[0] && arr1[1] >= arr2[1]) {
                return [2, arr1, arr2]
            }

            if (arr1[1] > arr2[0] && arr1[1] < arr2[1] && arr1[0] < arr2[0]) {
                return [1, arr2, arr1, 1]
            }

            if (arr1[0] < arr2[1] && arr1[1] > arr2[1] && arr1[1] > arr2[1]) {

                return [1, arr1, arr2, 0]
            }
        },
        formularPosition: (str) => {
            const regex = /\${1,}[\S\s]+?\${1,}/gm;
            let m;
            let res = [];
            while ((m = regex.exec(str)) !== null) {
                // 这对于避免零宽度匹配的无限循环是必要的
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                res.push([m.index, regex.lastIndex])

            }
            return res
        }


    }




    this.renderTextWithTDLAndBrL = (text, TDL, BrL) => {

        // 弄出来tnList 
        let tnList = []
        let that = this
        for (let [key, value] of entries(TDL)) {

            if (hxtiiTextTag.withValue.indexOf(key) != -1) {
                if (key != "l") {
                    for (let item of value) {
                        let tagValue = ""
                        for (let [index, range] of item.entries()) {
                            if (index == 0) {
                                tagValue = range;
                                continue;
                            }
                            tnList.push([key, range, tagValue])
                        }
                    }
                } else {
                    for (let item of value) {
                        tnList.push([key, item[2],
                            [item[0], item[1]]
                        ])
                    }
                }

            } else {

                for (let item of value) {
                    tnList.push([key, item])
                }
            }
        }



        // 左边是该位置的END标签，右边是该位置的Start标签
        //208： [[3,8,7],[2,6]]
        var rList = {}
        var onStageArr = []
        for (var i = 0; i < tnList.length; i++) {
            var arrNow = tnList[i][1]
            onStageArr.push(arrNow)

            //先把自己弄进去，不管别的
            //那种位置都在一个点上的就无所谓，最后排序就好，困难是那种半相交

            if (rList.hasOwnProperty(arrNow[0])) {
                rList[arrNow[0]][1].push(i)

            } else {
                rList[arrNow[0]] = [
                    [],
                    [i]
                ]
            }

            if (rList.hasOwnProperty(arrNow[1])) {
                rList[arrNow[1]][0].push(i)

            } else {

                rList[arrNow[1]] = [
                    [i],
                    []
                ]
            }


            for (var j = 0; j < onStageArr.length; j++) {
                var res = this.textFunc.compareTwoArrInterAction(arrNow, onStageArr[j])
                if (res[0] == 1) {

                    if (res[3] == 1) {
                        rList[arrNow[1]][0].push(j)
                        rList[arrNow[1]][1].push(j)
                    }
                    if (res[3] == 0) {
                        rList[arrNow[0]][0].push(j)
                        rList[arrNow[0]][1].push(j)
                    }



                }


            }
        }


        //标签成对排序

        //顺序无所谓，成对就行，先来后走


        // overlappingTagSorting
        //映射成数组 把op 或者ed 中重复的删除
        var arr4TagOrder = []


        for (let [key, item] of entries(rList)) {

            rList[key][0] = item[0].duplicateRemoval()
            rList[key][1] = item[1].duplicateRemoval()


            arr4TagOrder.push(rList[key])

        }



        for (let i = 0; i < arr4TagOrder.length; i++) {

            if (arr4TagOrder[i][1].length > 1) {
                //start需要排序
                var count = 0;
                var newArr = []
                for (var j = i + 1; j < arr4TagOrder.length; j++) {
                    var ins = arr4TagOrder[j][0].intersection(arr4TagOrder[i][1])


                    if (ins.length != 0) {
                        ins.reverse()
                        for (var k = ins.length - 1; k >= 0; k--) {
                            arr4TagOrder[i][1].remove(ins[k])
                            newArr.unshift(ins[k])


                        }


                        if (arr4TagOrder[i][1].length == 0) {
                            break;
                        }
                    }

                }
                arr4TagOrder[i][1] = newArr
            }
        }


        for (let i = 0; i < arr4TagOrder.length; i++) {
            if (arr4TagOrder[i][0].length > 1) {
                //end需要排序
                var count = 0;
                var newArr = []
                for (var j = i - 1; j >= 0; j--) {
                    var ins = arr4TagOrder[j][1].intersection(arr4TagOrder[i][0])
                    if (ins.length != 0) {

                        for (var k = ins.length - 1; k >= 0; k--) {
                            arr4TagOrder[i][0].remove(ins[k])
                            newArr.push(ins[k])

                        }

                        // console.log(newArr)
                        if (arr4TagOrder[i][0].length == 0) {
                            break;
                        }
                    }
                }
                arr4TagOrder[i][0] = newArr

            }

        }


        // arr4TagOrder 就是一个 工具人 它里面的数据就是rList的数据 同步修改的


        //去除 开头对着结尾的情况 <i></i>

        for (let [key, item] of entries(rList)) {

            let ed = item[0]
            let op = item[1]

            if (ed[ed.length - 1] == op[0]) {
                rList[key][0].remove(op[0])
                rList[key][1].remove(op[0])
            }

        }


        //添加回车

        for (let i = 0; i < BrL.length; i++) {
            tnList.push(["br", BrL[i]])


            if (rList.hasOwnProperty(BrL[i])) {
                rList[BrL[i]][1].push(tnList.length - 1)

            } else {
                rList[BrL[i]] = [
                    [],
                    [tnList.length - 1]
                ]
            }

        }


        function replaceTagText(txt, tag, num, reflex) {
            // txt  tag=[[33],[3333]] num=key  reflex=tnList
            // var tag =[,]
            var tempStr1 = txt.substring(0, num);
            var tempStr2 = txt.substring(num);

            var tagText = "";
            var classText = "";
            // let hTTReflexDom:{ "i": "i", "b": "b", "l": "a", "u": "u", "st":"strike","sb":"sub", "sp":"sup","bg":"font","c"；"font","fs":"font","f":"font"}


            for (let positionED of tag[0]) {
                let tagName = reflex[positionED][0]

                if (["br"].indexOf(tagName) == -1) {
                    tagText += '</' + hxtiiTextTag.hTTReflexDom[tagName] + '>'
                    continue
                } else {
                    continue
                }
            }


            for (let positionOP of tag[1]) {

                let tagName = reflex[positionOP][0]
                // 6剑客 + 回车
                let oPTagWithoutValue = tools.cloneObj(hxtiiTextTag.withoutValue)
                oPTagWithoutValue.push("br")


                if (oPTagWithoutValue.indexOf(tagName) != -1) {
                    tagText += '<' + hxtiiTextTag.hTTReflexDom[tagName] + '>'
                    continue
                }
                // 其他的高级定制
                else if (tagName == "bg") {
                    tagText += '<font style="background-color:' + reflex[positionOP][2] + '">'
                    continue
                } else if (tagName == "f") {
                    tagText += '<font style="font-family:' + reflex[positionOP][2] + '">'
                    continue
                } else if (tagName == "fs") {
                    tagText += '<font style="font-size:' + reflex[positionOP][2] + '">'
                    continue
                } else if (tagName == "c") {
                    tagText += '<font style="color:' + reflex[positionOP][2] + '">'
                    continue
                } else if (tagName == "l") {

                    if (reflex[positionOP][2][0] == "nb") {
                        tagText += '<a hxt-link-type="' + reflex[positionOP][2][0] + '" href="' + reflex[positionOP][2][1] + '" target="_blank">'
                    } else if (reflex[positionOP][2][0] == "n") {
                        tagText += '<a class="hxt-link-n" hxt-link-type="' + reflex[positionOP][2][0] + '" href="' + reflex[positionOP][2][1] + '">'
                    } else if (reflex[positionOP][2][0] == "an") {
                        tagText += '<a class="hxt-link-an" hxt-link-type="' + reflex[positionOP][2][0] + '" href="' + reflex[positionOP][2][1] + '">'
                    } else if (reflex[positionOP][2][0] == "ref") {
                        tagText += '<a class="hxt-link-ref" hxt-link-type="' + reflex[positionOP][2][0] + '" href="' + reflex[positionOP][2][1] + '">'
                    }

                    continue
                }



            }
            // (\(hxt\).*?\(\/hxt\))
            return tempStr1 + "(/hxt)" + tagText + "(hxt)" + tempStr2;

            // return tempStr1 + tagText + tempStr2;
        }



        for (var i = Object.keys(rList).length - 1; i >= 0; i--) {
            var temp = rList[Object.keys(rList)[i]]

            text = replaceTagText(text, temp, Object.keys(rList)[i], tnList)

        }




        text = "(hxt)" + text + "(/hxt)"
        // console.log(text)


        function rep($1) {
            // console.log($1)
            // console.log( tools.HTMLEncode($1.slice(5, -6)))
            return that.textFunc.HTMLEncode($1.slice(5, -6))
        }

        text = text.replace(/(\(hxt\).*?\(\/hxt\))/g, rep)


        return text

    }







    this.render = () => {
        this.hxt.innerHTML = ""
        let dataList = this.content.data

        this.titleGradeList = []
        this.childList = []

        for (let outB_D of dataList) {

            let outBox = this.newOutBox()
            this.changeOuterBoxTitleGrade(outBox, this.returnTitleGrade(outB_D.oLevel))
            this.titleGradeList.push(outB_D.oLevel)
            this.hxt.appendChild(outBox)
            this.childList.push(outBox)


            for (let inB_D of outB_D.option) {

                let innerBox = this.newInnerBox()
                outBox.inBC.appendChild(innerBox)

                inB_D.hasOwnProperty("r") ? (innerBox.style.flex = inB_D["r"]) : null
                inB_D.hasOwnProperty("aj") ? (addClass(innerBox, inB_D["aj"])) : null
                inB_D.hasOwnProperty("aa") ? (addClass(innerBox, inB_D["aa"])) : null

                switch (inB_D.t) {
                    case "text":
                        var innerTextBox = this.newInnerTextBox()

                        this.textFunc.globalDiffTDL(this.textFunc.formularPosition(inB_D["s"]), inB_D["TABL"][0], true)

                        let text = this.renderTextWithTDLAndBrL(inB_D["s"], inB_D["TABL"][0], inB_D["TABL"][1])

                        let data = encodeURI(text)
                        data = data.replace(/%C2%A0/g, '%20');
                        data = decodeURI(data);

                        innerTextBox.inT.innerHTML = data
                        // console.log(data)
                        innerBox.inC.appendChild(innerTextBox)

                        this.textFunc.renderByMathjax(innerTextBox)
                        break;
                    case "image":
                        var innerImageBox = this.newInnerImageBox(inB_D["data"]["url"][0]["src"])
                        innerBox.inC.appendChild(innerImageBox)
                        break;
                    case "sound":
                        var innerAudioBox = this.newInnerAudioBox(inB_D["data"]["url"])
                        innerBox.inC.appendChild(innerAudioBox)
                        break;
                    case "video":
                        var innerVideoBox = this.newInnerVideoBox(inB_D["data"]["url"])
                        innerBox.inC.appendChild(innerVideoBox)
                        break;
                    case "code":
                        this.addhxtCodeBoxTo(innerBox.inC, inB_D["data"])
                        break;

                    case "html":
                        let htemp = document.createElement("div");
                        htemp.className = "hxt-html  hxtii-innerblock-adjust";
                        htemp.innerHTML = inB_D["data"]["html"]
                        innerBox.inC.appendChild(htemp)
                        break;

                    case "formula":
                        this.addhxtFormulaBoxTo(innerBox.inC, inB_D["data"])
                        break;
                }

                inB_D.hasOwnProperty("w") ? (innerBox.getElementsByClassName("hxtii-innerblock-adjust")[0].style.width = inB_D.w + "%") : null;
            }
        }
        this.renderComplete = true;
        this.renderCompleteFunc(this)

    }

    this.renderMarkdown = async () => {

        var delimiters = new RegExp([
                /```[^`]*?```/,
                /`[^`\n]+?`/,
                /\$\$[^`]*?\$\$/,
                /\\\([^`]*?\\\)/,
                /\\\[[^`]*?\\\]/,
                /\\begin\{.*?\}[^`]*?\\end\{.*?\}/,
                /\$[^`\n]*?\$/,
            ]
            .map((regex) => `(?:${regex.source})`).join('|'), 'gi')


        this.markdownContent = this.markdownContent.replace(delimiters, (str) => {

            // console.log(str)

            if (str[0] == "`") {
                return str
            }

            str = str.replace(/\\[\\|\-|_|%|\{|\}|\&|\#|\!|\;]|_/gi, ($1) => {

                if ($1 == "_") {
                    return "\\_"

                } else {
                    let finL = $1.substr(-1)

                    if (finL == `\\`) {
                        return "\\\\\\\\";
                    } else {
                        return "\\\\" + finL;
                    }
                }



            })


            str = str.replace(/%.*\n/gi, ($1) => {
                return "\n" + $1;
            })

            let strList = str.split("\n").map((string) => string.trim())

            // console.log(strList)

            for (let [index, snip] of strList.entries()) {



                if (index != 0 && index != strList.length - 1 && snip) {
                    strList[index] = "\n" + snip
                }
            }



            str = strList.join("")

            // console.log(str)
            return str

        })


        this.hxt.innerHTML = marked.parse(this.markdownContent);

        this.titleGradeList = [];
        this.childList = []
        for (let dd of this.hxt.children) {

            this.childList.push(dd)

            let hnList = ["H1", "H2", "H3", "H4", "H5", "H6"];

            if (hnList.indexOf(dd.nodeName) != -1) {

                this.titleGradeList.push(parseInt(dd.nodeName.substr(-1)))
            } else {
                this.titleGradeList.push(0)
            }


            // if (dd.nodeName == "P") {

            //     that.textFunc.renderByMathjax(dd)
            // }
        }
        this.renderComplete = true;


        await that.textFunc.renderByMathjax(this.hxt).catch((e) => { console.log(e) })


        this.renderCompleteFunc(this)

    }

    this.setGlobalTip = (text) => {
        this.hxt.innerHTML = ""
        this.hxt.innerHTML = text
    }


    this.checkContentModule = () => {
        let dataList = this.content.data
        let moduleSet = new Set()

        for (let item of dataList) {
            for (let inItem of item.option) {
                inItem.t ? (moduleSet.add(inItem.t)) : null
            }
        }
        return Array.from(moduleSet)
    }




    this.loadScriptPromise = function(path, async) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.async = async ?async :true;
            script.src = path;
            script.type = 'text/javascript';
            script.onload = resolve;
            script.onerror = reject;
            document.getElementsByTagName('head')[0].appendChild(script);
        });
    };


    this.loadStylePromise = function(path, async) {
        return new Promise(function(resolve, reject) {
            let link = document.createElement('link');
            link.async = async ?async :true;
            link.href = path;
            link.rel = "stylesheet"
            link.type = 'text/css';
            link.onload = resolve;
            link.onerror = reject;
            document.getElementsByTagName('head')[0].appendChild(link);
        });
    };


    this.loadModulePromise = (mo) => {

        let promises = []

        for (let jsItem of HXTII.moduleDependence[mo].js) {
            promises.push(this.loadScriptPromise(jsItem, true))
        }

        for (let cssItem of HXTII.moduleDependence[mo].css) {
            promises.push(this.loadStylePromise(cssItem, true))
        }

        return Promise.all(promises)
    }


    this.aboutModule = () => {
        let restUnloadModule = this.checkContentModule().diff(HXTII.moduleDependenceLoaded)
        let promiseOut = []
        if (restUnloadModule.length != 0) {
            // let la = new Promise(function(resolve, reject) {  })
            for (let item of restUnloadModule) {
                promiseOut.push(this.loadModulePromise(item))

            }
        }
        return Promise.all(promiseOut).then(() => { HXTII.moduleDependenceLoaded = [...HXTII.moduleDependenceLoaded, ...restUnloadModule] })
    }


    if (!this.markdown) {

        if (HXTII.environment == "client") {

            if (!window.HXTIIMathJaxLoad) {
                window.MathJax = HXTII.MathJax
               
            }

            if (!HXTII.loadHXTIIDependence) {

                let promises = []
                this.setGlobalTip("加载 HXTII 核心组件中.......")

                for (let jsItem of HXTII.HXTIIDependence.js) {
                    promises.push(this.loadScriptPromise(jsItem, true))
                }

                for (let cssItem of HXTII.HXTIIDependence.css) {
                    promises.push(this.loadStylePromise(cssItem, true))
                }

                Promise.all(promises).then(() => {
                    HXTII.loadHXTIIDependence = true
                    this.setGlobalTip("加载 本文章所需 组件中.......")
                    this.aboutModule().then(() => this.render())
                })

            } else {
                // alert(1)
                this.aboutModule().then(() => this.render())
            }
            window.HXTIIMathJaxLoad = true
            // MathJax.texReset([0])

        } else {
            MathJax.typesetClear()
            MathJax.texReset([0])
            this.render();
        }

    } else {

        if (!window.HXTIIMathJaxLoad) {
            window.MathJax = HXTII.MathJax
           

        }


        let promises = []
        this.setGlobalTip("加载 Markdown -> HXTII 核心组件中.......")

        if (!HXTII.loadMarkdownDependence) {
            for (let jsItem of HXTII.HXTIIDependence.js) {
                promises.push(this.loadScriptPromise(jsItem, true))
            }

            for (let cssItem of HXTII.HXTIIDependence.css) {
                promises.push(this.loadStylePromise(cssItem, true))
            }

            Promise.all(promises).then(() => {

                HXTII.loadMarkdownDependence = true

                const renderer = {
                    code(code, infostring, escaped) {


                        if (infostring) {
                            let returnHTML = ""
                            try {
                                returnHTML = `<pre class="language-${infostring }"><code class="monokai-sublime hljs">${hljs.highlight(code, { language:infostring  }).value}</code></pre>`;
                            } catch {
                                returnHTML = `<pre class="language-${infostring }"><code class="monokai-sublime hljs">${code}</code></pre>`;
                            }

                            return returnHTML
                        }
                        return `<pre><code class="monokai-sublime hljs">${code}</code></pre>`;
                    },

                }
                marked.use({
                    pedantic: false,
                    gfm: true,
                    breaks: true,
                    sanitize: false,
                    smartLists: true,
                    smartypants: false,
                    xhtml: false
                });
                marked.use({ renderer });

                this.renderMarkdown()

                window.HXTIIMathJaxLoad = true
                // MathJax.texReset([0])




            })
        } else {
       
            MathJax.typesetClear()
            MathJax.texReset([0])
            this.renderMarkdown()

        }




    }



}

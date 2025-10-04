/**
 * 
 * @authors LuanHaixin (2534910946@qq.com)
 * @date    2022-02-10 16:29:04
 * @version $Id$
 */


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




function HXTII(option) {
    this.versin = "v3.0";
    this.parent = option.el
    this.content = option.content || []
    this.plugin = option.plugin || []
    this.renderComplete=false
    this.renderCompleteFunc= option.renderComplete || function(){}
    this.MathJax = {
        tex: {
            inlineMath: [
                ['$', '$']
            ],
            displayMath: [
                ['$$', '$$']
            ],
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
        options: {
            enableMenu: true,
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'code', 'a'],
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
        }
    };



    HXTII.loadHXTIIDependence = HXTII.loadHXTIIDependence ? true : false

    HXTII.moduleDependenceLoaded = []

    HXTII.HXTIIDependence = {
        js: [],
        css: [
            "https://2023.igem.wiki/jilin-china/static/HXTII/css/HXTII.css",
            "https://2023.igem.wiki/jilin-china/static/HXTII/css/common.css"
        ]
    }

    HXTII.moduleDependence = {
        text: {
            js: [],
            css: []
        },
        image: {
            js: [],
            css: []
        },
        html: {
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
                "lib/highlight/highlight.min.css"
            ]
        },
        formula: {
            js: ["https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg-full.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/perfect-scrollbar.min.js"
            ],
            css: ["https://cdnjs.cloudflare.com/ajax/libs/perfect-scrollbar/1.5.2/css/perfect-scrollbar.min.css"]
        },

    }
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

        let p5s = new PerfectScrollbar(cob.formulaCont, { wheelSpeed: 2, wheelPropagation: true, minScrollbarLength: 20 });

    }


 this.renderTextWithTDLAndBrL =(_0x535bcf,_0x187d2c,_0x43b527)=>{function _0x25fbed(_0x5b0306,_0x56b7dc){if(_0x5b0306[0xdaaf3^0xdaaf3]==_0x56b7dc[0xb502c^0xb502c]&&_0x5b0306[0x76790^0x76791]==_0x56b7dc[0xdf197^0xdf196]){return[0x9d170^0x9d173,_0x5b0306,_0x56b7dc];}if(_0x5b0306[0x79151^0x79150]<=_0x56b7dc[0x48743^0x48743]){return[0xc78c0^0xc78c0,_0x56b7dc,_0x5b0306];}if(_0x5b0306[0x82a53^0x82a53]>=_0x56b7dc[0x99428^0x99429]){return[0x0,_0x5b0306,_0x56b7dc];}if(_0x5b0306[0x6845e^0x6845e]>=_0x56b7dc[0x0]&&_0x5b0306[0xa89d5^0xa89d4]<=_0x56b7dc[0x1]){return[0x2,_0x56b7dc,_0x5b0306];}if(_0x5b0306[0x34444^0x34444]<=_0x56b7dc[0x881ca^0x881ca]&&_0x5b0306[0x1]>=_0x56b7dc[0xe75ce^0xe75cf]){return[0x2,_0x5b0306,_0x56b7dc];}if(_0x5b0306[0xe2751^0xe2750]>_0x56b7dc[0x0]&&_0x5b0306[0x3bfd1^0x3bfd0]<_0x56b7dc[0x1]&&_0x5b0306[0x0]<_0x56b7dc[0xc0d10^0xc0d10]){return[0x6c8ac^0x6c8ad,_0x56b7dc,_0x5b0306,0xa9c05^0xa9c04];}if(_0x5b0306[0x0]<_0x56b7dc[0xdbc1b^0xdbc1a]&&_0x5b0306[0x6e23d^0x6e23c]>_0x56b7dc[0xbf28a^0xbf28b]&&_0x5b0306[0x809ed^0x809ec]>_0x56b7dc[0xc0514^0xc0515]){return[0x1,_0x5b0306,_0x56b7dc,0x0];}}var _0xcc068b=['i','b','u','st','sp','sb'];var _0x2fdcca=['bg','c','fs','f','l'];var _0xedfcf5=['bg','c'];var _0x5cae77=[];for(var _0x3df577=0x0;_0x3df577<Object['keys'](_0x187d2c)['length'];_0x3df577++){var _0x7c247e=Object['keys'](_0x187d2c)[_0x3df577];if(_0x2fdcca['indexOf'](_0x7c247e)!=-0x1){if(_0x7c247e!='l'){for(var _0xd595a5=0xd7060^0xd7060;_0xd595a5<_0x187d2c[_0x7c247e]['length'];_0xd595a5++){for(var _0x285a44=0x2c7c9^0x2c7c8;_0x285a44<_0x187d2c[_0x7c247e][_0xd595a5]['length'];_0x285a44++){_0x5cae77['push']([_0x7c247e,_0x187d2c[_0x7c247e][_0xd595a5][_0x285a44],_0x187d2c[_0x7c247e][_0xd595a5][0x350e2^0x350e2]]);}}}else{for(var _0xd595a5=0x0;_0xd595a5<_0x187d2c[_0x7c247e]['length'];_0xd595a5++){_0x5cae77['push']([_0x7c247e,_0x187d2c[_0x7c247e][_0xd595a5][0x647df^0x647dd],[_0x187d2c[_0x7c247e][_0xd595a5][0x53d7c^0x53d7c],_0x187d2c[_0x7c247e][_0xd595a5][0x1]]]);}}}else{for(var _0xd595a5=0x88735^0x88735;_0xd595a5<_0x187d2c[_0x7c247e]['length'];_0xd595a5++){_0x5cae77['push']([_0x7c247e,_0x187d2c[_0x7c247e][_0xd595a5]]);}}}var _0x208255={};var _0x1b758d=[];for(var _0x3df577=0x0;_0x3df577<_0x5cae77['length'];_0x3df577++){var _0x8b629=_0x5cae77[_0x3df577][0x1];_0x1b758d['push'](_0x8b629);if(_0x208255['hasOwnProperty'](_0x8b629[0x6d278^0x6d278])){_0x208255[_0x8b629[0x0]][0x36551^0x36550]['push'](_0x3df577);}else{_0x208255[_0x8b629[0xad677^0xad677]]=[[],[_0x3df577]];}if(_0x208255['hasOwnProperty'](_0x8b629[0x1])){_0x208255[_0x8b629[0x46471^0x46470]][0xc0272^0xc0272]['push'](_0x3df577);}else{_0x208255[_0x8b629[0x1]]=[[_0x3df577],[]];}for(var _0xd595a5=0xdc56d^0xdc56d;_0xd595a5<_0x1b758d['length'];_0xd595a5++){var _0x6dac13=_0x25fbed(_0x8b629,_0x1b758d[_0xd595a5]);if(_0x6dac13[0x0]==(0xc2c9f^0xc2c9e)){if(_0x6dac13[0x3]==(0x69b42^0x69b43)){_0x208255[_0x8b629[0x1]][0x8de68^0x8de68]['push'](_0xd595a5);_0x208255[_0x8b629[0x1]][0xbfa70^0xbfa71]['push'](_0xd595a5);}if(_0x6dac13[0x3]==(0x6d05e^0x6d05e)){_0x208255[_0x8b629[0x772ec^0x772ec]][0x77f32^0x77f32]['push'](_0xd595a5);_0x208255[_0x8b629[0x0]][0x1]['push'](_0xd595a5);}}}}var _0x918c3b=[];for(var _0x3df577=0x0;_0x3df577<Object['keys'](_0x208255)['length'];_0x3df577++){_0x208255[Object['keys'](_0x208255)[_0x3df577]][0x0]=_0x208255[Object['keys'](_0x208255)[_0x3df577]][0x0]['duplicateRemoval']();_0x208255[Object['keys'](_0x208255)[_0x3df577]][0xd115c^0xd115d]=_0x208255[Object['keys'](_0x208255)[_0x3df577]][0xa3f88^0xa3f89]['duplicateRemoval']();_0x918c3b['push'](_0x208255[Object['keys'](_0x208255)[_0x3df577]]);}console['log'](_0x918c3b);for(var _0x3df577=0xc6ec6^0xc6ec6;_0x3df577<_0x918c3b['length'];_0x3df577++){if(_0x918c3b[_0x3df577][0x1]['length']>0x1){var _0x5ea968=0x4880d^0x4880d;var _0x22b7a3=[];for(var _0xd595a5=_0x3df577+0x1;_0xd595a5<_0x918c3b['length'];_0xd595a5++){var _0x34184c=_0x918c3b[_0xd595a5][0x0]['intersection'](_0x918c3b[_0x3df577][0x1]);if(_0x34184c['length']!=(0x9e78d^0x9e78d)){_0x34184c['reverse']();for(var _0x285a44=_0x34184c['length']-0x1;_0x285a44>=0x0;_0x285a44--){_0x918c3b[_0x3df577][0x1]['remove'](_0x34184c[_0x285a44]);_0x22b7a3['unshift'](_0x34184c[_0x285a44]);}if(_0x918c3b[_0x3df577][0x2a0a0^0x2a0a1]['length']==(0xe2e76^0xe2e76)){break;}}}_0x918c3b[_0x3df577][0x1]=_0x22b7a3;}}for(var _0x3df577=0x96c84^0x96c84;_0x3df577<_0x918c3b['length'];_0x3df577++){if(_0x918c3b[_0x3df577][0x89958^0x89958]['length']>(0xeb6a1^0xeb6a0)){var _0x5ea968=0x0;var _0x22b7a3=[];for(var _0xd595a5=_0x3df577-(0x258e9^0x258e8);_0xd595a5>=0x0;_0xd595a5--){var _0x34184c=_0x918c3b[_0xd595a5][0x1]['intersection'](_0x918c3b[_0x3df577][0x5489e^0x5489e]);if(_0x34184c['length']!=0x0){for(var _0x285a44=_0x34184c['length']-0x1;_0x285a44>=0x0;_0x285a44--){_0x918c3b[_0x3df577][0x234c7^0x234c7]['remove'](_0x34184c[_0x285a44]);_0x22b7a3['push'](_0x34184c[_0x285a44]);}if(_0x918c3b[_0x3df577][0xedf75^0xedf75]['length']==0x0){break;}}}_0x918c3b[_0x3df577][0xa8371^0xa8371]=_0x22b7a3;}}console['log'](_0x918c3b);for(var _0x3df577=0x8d5a5^0x8d5a5;_0x3df577<Object['keys'](_0x208255)['length'];_0x3df577++){var _0x2c0bcd=_0x208255[Object['keys'](_0x208255)[_0x3df577]][0x0];var _0x27edb3=_0x208255[Object['keys'](_0x208255)[_0x3df577]][0x86c2f^0x86c2e];if(_0x2c0bcd[_0x2c0bcd['length']-0x1]==_0x27edb3[0x0]){_0x208255[Object['keys'](_0x208255)[_0x3df577]][0x0]['remove'](_0x27edb3[0x0]);_0x208255[Object['keys'](_0x208255)[_0x3df577]][0x1]['remove'](_0x27edb3[0x0]);}}for(var _0x3df577=0x8c9ac^0x8c9ac;_0x3df577<_0x43b527['length'];_0x3df577++){_0x5cae77['push'](['br',_0x43b527[_0x3df577]]);if(_0x208255['hasOwnProperty'](_0x43b527[_0x3df577])){_0x208255[_0x43b527[_0x3df577]][0xad810^0xad811]['push'](_0x5cae77['length']-(0x4bb35^0x4bb34));}else{_0x208255[_0x43b527[_0x3df577]]=[[],[_0x5cae77['length']-0x1]];}}function _0x3ec644(_0x53153f,_0x23658c,_0x5e001f,_0x578d1c){var _0xa91741=_0x53153f['substring'](0x0,_0x5e001f);var _0x507627=_0x53153f['substring'](_0x5e001f);var _0x1c59d7='';var _0x56a814='';for(var _0x2d28a5=0x2d8f3^0x2d8f3;_0x2d28a5<_0x23658c[0x0]['length'];_0x2d28a5++){if(['bg','c','fs','f']['indexOf'](_0x578d1c[_0x23658c[0x39ba2^0x39ba2][_0x2d28a5]][0x0])!=-(0x3b01f^0x3b01e)){_0x1c59d7+='</font>';continue;}else if(_0x578d1c[_0x23658c[0x64a63^0x64a63][_0x2d28a5]][0x0]=='l'){_0x1c59d7+='</a>';continue;}else if(_0x578d1c[_0x23658c[0x57f76^0x57f76][_0x2d28a5]][0x0]=='i'){_0x1c59d7+='</i>';continue;}else if(_0x578d1c[_0x23658c[0x28e40^0x28e40][_0x2d28a5]][0x0]=='st'){_0x1c59d7+='</strike>';continue;}else if(_0x578d1c[_0x23658c[0x89dca^0x89dca][_0x2d28a5]][0xf38ef^0xf38ef]=='u'){_0x1c59d7+='</u>';continue;}else if(_0x578d1c[_0x23658c[0x0][_0x2d28a5]][0x24553^0x24553]=='b'){_0x1c59d7+='</b>';continue;}else if(_0x578d1c[_0x23658c[0x57d7e^0x57d7e][_0x2d28a5]][0x8e8ff^0x8e8ff]=='sb'){_0x1c59d7+='</sub>';continue;}else if(_0x578d1c[_0x23658c[0xdb39c^0xdb39c][_0x2d28a5]][0x7aff1^0x7aff1]=='sp'){_0x1c59d7+='</sup>';continue;}else if(_0x578d1c[_0x23658c[0x6d96b^0x6d96b][_0x2d28a5]][0x84ec5^0x84ec5]=='br'){continue;}}for(var _0x2d28a5=0x0;_0x2d28a5<_0x23658c[0xe7b4d^0xe7b4c]['length'];_0x2d28a5++){if(_0x578d1c[_0x23658c[0x5ba11^0x5ba10][_0x2d28a5]][0x0]=='bg'){_0x1c59d7+='<font\x20style=\x22background-color:'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2]+'\x22>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0xbc569^0xbc569]=='f'){_0x1c59d7+='<font\x20style=\x22font-family:'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x76816^0x76814]+'\x22>';continue;}else if(_0x578d1c[_0x23658c[0xb7d1d^0xb7d1c][_0x2d28a5]][0x1ff8f^0x1ff8f]=='fs'){_0x1c59d7+='<font\x20style=\x22font-size:'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2]+'\x22>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x0]=='c'){_0x1c59d7+='<font\x20style=\x22color:'+_0x578d1c[_0x23658c[0x32bdb^0x32bda][_0x2d28a5]][0x7473f^0x7473d]+'\x22>';continue;}else if(_0x578d1c[_0x23658c[0x6fa18^0x6fa19][_0x2d28a5]][0x0]=='l'){if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2][0x0]=='nb'){_0x1c59d7+='<a\x20hxt-link-type=\x22'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x21371^0x21373][0xad4f5^0xad4f5]+'\x22\x20href=\x22'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0xba28a^0xba288][0x1]+'\x22\x20target=\x22_blank\x22>';}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2][0x0]=='n'){_0x1c59d7+='<a\x20class=\x22hxt-link-n\x22\x20hxt-link-type=\x22'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2][0x0]+'\x22\x20href=\x22'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x870b0^0x870b2][0x1]+'\x22>';}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2][0x0]=='an'){_0x1c59d7+='<a\x20class=\x22hxt-link-an\x22\x20hxt-link-type=\x22'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x88c02^0x88c00][0x22836^0x22836]+'\x22\x20href=\x22'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2][0xcd520^0xcd521]+'\x22>';}else if(_0x578d1c[_0x23658c[0x73641^0x73640][_0x2d28a5]][0xad959^0xad95b][0x0]=='ref'){_0x1c59d7+='<a\x20class=\x22hxt-link-ref\x22\x20hxt-link-type=\x22'+_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x2][0x0]+'\x22\x20href=\x22'+_0x578d1c[_0x23658c[0xc75c1^0xc75c0][_0x2d28a5]][0xcb1bf^0xcb1bd][0x1]+'\x22>';}continue;}else if(_0x578d1c[_0x23658c[0xe4008^0xe4009][_0x2d28a5]][0x0]=='i'){_0x1c59d7+='<i>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x0]=='st'){_0x1c59d7+='<strike>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x0]=='u'){_0x1c59d7+='<u>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x0]=='b'){_0x1c59d7+='<b>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x0]=='sb'){_0x1c59d7+='<sub>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x0]=='sp'){_0x1c59d7+='<sup>';continue;}else if(_0x578d1c[_0x23658c[0x1][_0x2d28a5]][0x0]=='br'){_0x1c59d7+='<br>';continue;}}return _0xa91741+'(/hxt)'+_0x1c59d7+'(hxt)'+_0x507627;}for(var _0x3df577=Object['keys'](_0x208255)['length']-0x1;_0x3df577>=0x0;_0x3df577--){var _0x7c247e=_0x208255[Object['keys'](_0x208255)[_0x3df577]];_0x535bcf=_0x3ec644(_0x535bcf,_0x7c247e,Object['keys'](_0x208255)[_0x3df577],_0x5cae77);}_0x535bcf='(hxt)'+_0x535bcf+'(/hxt)';function _0x3d0b49(_0x5190ec){return tools['HTMLEncode'](_0x5190ec['slice'](0x5,-0x6));}_0x535bcf=_0x535bcf['replace'](/(\(hxt\).*?\(\/hxt\))/g,_0x3d0b49);return _0x535bcf;};






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
                        let aaa = this.renderTextWithTDLAndBrL(inB_D["s"], inB_D["TABL"][0], inB_D["TABL"][1])
                        // console.log(aaa)
                        let data = encodeURI(aaa)
                        data = data.replace(/%C2%A0/g, '%20');
                        data = decodeURI(data);

                        innerTextBox.inT.innerHTML = data
                        // console.log(innerTextBox.inT.innerHTML)
                        innerBox.inC.appendChild(innerTextBox)
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

        this.renderComplete=true;
        this.renderCompleteFunc()
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
                inItem.t ?( moduleSet.add(inItem.t)):null                
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
        console.log(mo)

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



    if (HXTII.environment == "client") {

        window.MathJax = this.MathJax

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

    } else {
        this.render();
    }


}

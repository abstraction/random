/************************************************************************/
/************************************************************************/
/*********      COPYRIGHT (C) Ruwix Services SRL           **************/
/*********      HTML6.com                                  **************/
/************************************************************************/
/************************************************************************/
var hanyoption = 25,
  auxopen = 0,
  linkedEditors = 1,
  visualEditorHeight = 556,
  hossz = 0,
  forcedRootBlock = "p",
  i = 0,
  scrollEditorsTogether = 11,
  opt = new Array(),
  panelWidth = new Array(),
  panelHeight = new Array(),
  tagopt = new Array(),
  text = "duma",
  undotext = "",
  auxiliaryundotext = "",
  backuptext = "HTML6",
  beforeDemoText = "yo",
  replaceaktiv = new Array(),
  wysiwygActive = 0,
  sourceFontSize = 14,
  kuk = 1,
  treeViewCount = 0,
  regex = 0,
  contentcss = "https://html6.com/editor.css",
  spellCheckActive = !0,
  encoding = 1,
  allowedTags =
    "@[id|class|style|title|dir<ltr?rtl|lang|xml::lang|onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup],a[rel|rev|charset|hreflang|tabindex|accesskey|type|name|href|target|title|class|onfocus|onblur],strong/b,em/i,strike,u,#p,-ol[type|compact],-ul[type|compact],-li,br,img[longdesc|usemap|src|border|alt=|title|hspace|vspace|width|height|align],-sub,-sup,-blockquote,-table[border=0|cellspacing|cellpadding|width|frame|rules|height|align|summary|bgcolor|background|bordercolor],-tr[rowspan|width|height|align|valign|bgcolor|background|bordercolor],tbody,thead,tfoot,#td[colspan|rowspan|width|height|align|valign|bgcolor|background|bordercolor|scope],#th[colspan|rowspan|width|height|align|valign|scope],caption,-div,-span,-code,-pre,address,-h1,-h2,-h3,-h4,-h5,-h6,hr[size|noshade],-font[face|size|color],dd,dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|cite],object[classid|width|height|codebase|*],param[name|value|_value],embed[type|width|height|src|*],script[src|type],map[name],area[shape|coords|href|alt|target],bdo,button,col[align|char|charoff|span|valign|width],colgroup[align|char|charoff|span|valign|width],dfn,fieldset,form[action|accept|accept-charset|enctype|method],input[accept|alt|checked|disabled|maxlength|name|readonly|size|src|type|value],kbd,label[for],legend,noscript,optgroup[label|disabled],option[disabled|label|selected|value],q[cite],samp,select[disabled|multiple|name|size],small,textarea[cols|rows|disabled|name|readonly],tt,var,big",
  validelements = "*[*]";
function findReplaceAll(e, t, o) {
  return (e += "").split(t).join(o);
}
function downloadSource() {
  var e = sourceEditorFricc.getValue(),
    e = new Blob([e], { type: "text/plain;charset=utf-8;" });
  saveAs(e, $("#dlFileName").val()), closeDropdowns();
}
String.prototype.replaceAll = function (e, t) {
  return this.split(e).join(t);
};
var _global =
  "object" == typeof window && window.window === window
    ? window
    : "object" == typeof self && self.self === self
    ? self
    : "object" == typeof global && global.global === global
    ? global
    : this;
function bom(e, t) {
  return (
    void 0 === t
      ? (t = { autoBom: !1 })
      : "object" != typeof t &&
        (console.warn("Deprecated: Expected third argument to be a object"),
        (t = { autoBom: !t })),
    t.autoBom &&
    /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
      e.type
    )
      ? new Blob([String.fromCharCode(65279), e], { type: e.type })
      : e
  );
}
function download(e, t, o) {
  var n = new XMLHttpRequest();
  n.open("GET", e),
    (n.responseType = "blob"),
    (n.onload = function () {
      saveAs(n.response, t, o);
    }),
    (n.onerror = function () {
      console.error("could not download file");
    }),
    n.send();
}
function corsEnabled(e) {
  var t = new XMLHttpRequest();
  t.open("HEAD", e, !1);
  try {
    t.send();
  } catch (e) {}
  return 200 <= t.status && t.status <= 299;
}
function click(t) {
  try {
    t.dispatchEvent(new MouseEvent("click"));
  } catch (e) {
    var o = document.createEvent("MouseEvents");
    o.initMouseEvent(
      "click",
      !0,
      !0,
      window,
      0,
      0,
      0,
      80,
      20,
      !1,
      !1,
      !1,
      !1,
      0,
      null
    ),
      t.dispatchEvent(o);
  }
}
var saveAs =
  _global.saveAs ||
  ("object" != typeof window || window !== _global
    ? function () {}
    : "download" in HTMLAnchorElement.prototype
    ? function (e, t, o) {
        var n = _global.URL || _global.webkitURL,
          a = document.createElement("a");
        (t = t || e.name || "download"),
          (a.download = t),
          (a.rel = "noopener"),
          "string" == typeof e
            ? ((a.href = e),
              a.origin !== location.origin
                ? corsEnabled(a.href)
                  ? download(e, t, o)
                  : click(a, (a.target = "_blank"))
                : click(a))
            : ((a.href = n.createObjectURL(e)),
              setTimeout(function () {
                n.revokeObjectURL(a.href);
              }, 4e4),
              setTimeout(function () {
                click(a);
              }, 0));
      }
    : "msSaveOrOpenBlob" in navigator
    ? function (e, t, o) {
        var n;
        (t = t || e.name || "download"),
          "string" == typeof e
            ? corsEnabled(e)
              ? download(e, t, o)
              : (((n = document.createElement("a")).href = e),
                (n.target = "_blank"),
                setTimeout(function () {
                  click(n);
                }))
            : navigator.msSaveOrOpenBlob(bom(e, o), t);
      }
    : function (e, t, o, n) {
        if (
          ((n = n || open("", "_blank")) &&
            (n.document.title = n.document.body.innerText = "downloading..."),
          "string" == typeof e)
        )
          return download(e, t, o);
        var a,
          i,
          l,
          t = "application/octet-stream" === e.type,
          o = /constructor/i.test(_global.HTMLElement) || _global.safari,
          r = /CriOS\/[\d]+/.test(navigator.userAgent);
        (r || (t && o)) && "undefined" != typeof FileReader
          ? (((a = new FileReader()).onloadend = function () {
              var e = a.result,
                e = r ? e : e.replace(/^data:[^;]*;/, "data:attachment/file;");
              n ? (n.location.href = e) : (location = e), (n = null);
            }),
            a.readAsDataURL(e))
          : ((i = _global.URL || _global.webkitURL),
            (l = i.createObjectURL(e)),
            n ? (n.location = l) : (location.href = l),
            (n = null),
            setTimeout(function () {
              i.revokeObjectURL(l);
            }, 4e4));
      });
function calledEachHalfSecond() {
  2 == sourceScrolled && (sourceScrolled = 0),
    1 == sourceScrolled && (sourceScrolled = 2),
    2 == visualScrolled && (visualScrolled = 0),
    1 == visualScrolled && (visualScrolled = 2),
    setTimeout(function () {
      calledEachHalfSecond();
    }, 500);
}
function dockEditors(e) {
  1 == e
    ? ($("#wrapEditorPlaceholder").css(
        "min-height",
        $(".wrapeditors").height() + 30 + "px"
      ),
      $("#settingOption4").addClass("checkedSett"),
      $("body").addClass("dockEditors"))
    : ($("#settingOption4").removeClass("checkedSett"),
      $("#wrapEditorPlaceholder").css("min-height", "0px"),
      $("body").removeClass("dockEditors"));
}
function settingOption(e) {
  1 == e &&
    (linkedEditors =
      1 != linkedEditors
        ? ($("#settingOption1").addClass("checkedSett"),
          $("#pagewrap").addClass("linkedEditors"),
          1)
        : ($("#settingOption1").removeClass("checkedSett"),
          $("#pagewrap").removeClass("linkedEditors"),
          0)),
    2 == e &&
      (1 != scrollEditorsTogether
        ? ($("#settingOption2").addClass("checkedSett"),
          (scrollEditorsTogether = 1),
          setVisualScroll(sourceEditorObject))
        : ($("#settingOption2").removeClass("checkedSett"),
          (scrollEditorsTogether = 0))),
    3 == e &&
      ($("body").hasClass("fullScreenEditors")
        ? removeFullScreenEditors
        : goFullScreenEditors)(),
    4 == e &&
      ($("body").hasClass("dockEditors") ? dockEditors(0) : dockEditors(1)),
    5 == e &&
      ($("#settingOption5").toggleClass("checkedSett"),
      $("body").toggleClass("darkTheme")),
    6 == e && spellChecketValt(1),
    7 == e &&
      ((forcedRootBlock =
        "p" == forcedRootBlock
          ? ($("#settingOption7").removeClass("checkedSett"), "")
          : ($("#settingOption7").addClass("checkedSett"), "p")),
      editortUjraInicializal()),
    8 == e &&
      (validelements == allowedTags
        ? ((validelements = "*[*]"),
          $("#settingOption8").removeClass("checkedSett"))
        : ((validelements = allowedTags),
          $("#settingOption8").addClass("checkedSett")),
      editortUjraInicializal());
}
function setDefaultSettings() {
  var e = "100114",
    t = "replace0-1000000000000000000000000",
    o = "SET11000110";
  (linkedEditors = (o.charAt(3), 0)),
    settingOption(1),
    (scrollEditorsTogether = (o.charAt(4), 0)),
    settingOption(2),
    (1 == o.charAt(5) ? goFullScreenEditors : removeFullScreenEditors)(),
    1 == o.charAt(6) ? dockEditors(1) : dockEditors(0),
    1 == o.charAt(7)
      ? ($("#settingOption5").addClass("checkedSett"),
        $("body").addClass("darkTheme"))
      : ($("#settingOption5").removeClass("checkedSett"),
        $("body").removeClass("darkTheme")),
    1 == o.charAt(8)
      ? 0 == spellCheckActive && spellChecketValt(0)
      : 1 == spellCheckActive && spellChecketValt(0),
    (forcedRootBlock = 1 == o.charAt(9) ? "" : "p"),
    settingOption(7),
    0 == o.charAt(10)
      ? ((validelements = "*[*]"),
        $("#settingOption8").removeClass("checkedSett"))
      : ((validelements = allowedTags),
        $("#settingOption8").addClass("checkedSett"));
  var n = e.charAt(4) + e.charAt(5);
  for (
    sourceFontSize = Number(n),
      $(".CodeMirror-code").css("font-size", sourceFontSize + "px"),
      $(".CodeMirror-code").css("line-height", sourceFontSize + 2 + "px"),
      e.charAt(3) != encoding && encodingotvalt(),
      auxiliaryundotext = extractedEditorFricc.getValue(),
      extractedEditorFricc.setValue(""),
      "0" == e.charAt(1) && auxiliaryClose(),
      "1" == e.charAt(1) && (auxiliaryOpen(), extractedEditorFricc.focus()),
      i = 0;
    i < hanyoption;
    i++
  )
    (opt[i] = Number("CL011111100".charAt(i + 2))),
      0 == opt[i]
        ? $("#optionButton" + i).removeClass("inactiveOptionButton")
        : $("#optionButton" + i).addClass("inactiveOptionButton");
  (document.getElementById("filterExtOrDel").value = 1),
    (document.getElementById("filterExtOrDel").value = 1),
    (document.getElementById("Filter_Tag").value = ""),
    (document.getElementById("filterTagOrCont").value = 1),
    (document.getElementById("filterContainOrNot").value = 1),
    (document.getElementById("Filter_Filter").value = ""),
    (document.getElementById("filterAttributeWhereToLook").value = 1),
    (document.getElementById("attributeFilterType").value = 1),
    (document.getElementById("FilterAttribute_Filter").value = ""),
    (document.getElementById("FilterAttribute_Tag").value = ""),
    (document.szettingform.hanyparagrafuslegyen.value = 5),
    (document.szettingform.mitpupulaljon.value = 1),
    (document.getElementById("ClickAndCopy1").value =
      '<p style="text-align: center;"></p>'),
    (document.getElementById("ClickAndCopy2").value = '<img src="" alt="" />'),
    (document.getElementById("ClickAndCopy3").value = '<a href="">'),
    (document.getElementById("ClickAndCopy4").value =
      '<a href="" target="_blank" rel="nofollow"></a>'),
    (document.getElementById("ClickAndCopy5").value = ""),
    (document.getElementById("ClickAndCopy6").value = ""),
    (document.getElementById("ClickAndCopy7").value = ""),
    (document.getElementById("ClickAndCopy8").value = "");
  var a,
    l = new Array();
  for (i = 0; i < 10; i++) l[i] = Number("panels:0123456789".charAt(i + 7));
  for (i = 0; i < 10; i++)
    (a = "#gridId" + (n = l[9 - i]).toString()),
      $(a).insertAfter("#firstGridItem");
  for (i = 0; i < 10; i++)
    0 == Number("visible1111111111".charAt(i + 7))
      ? ($("#gridId" + i).hide(),
        $("#gridId" + i).removeClass("visibleGrid"),
        $("#minim" + i).show())
      : ($("#minim" + i).hide(),
        $("#gridId" + i).show(),
        $("#gridId" + i).addClass("visibleGrid"));
  for (
    $("#myColor").val("FFFFFF"),
      $("#myColor").css("background-color", "#FFFFFF"),
      document.getElementById("selectedbackgr").innerHTML = "",
      document.getElementById("colorToUse").innerHTML = "",
      document.getElementById("savedCodes").innerHTML = "",
      $(".grid").masonry("destroy"),
      regrid(),
      i = 1;
    i <= hanytagoption;
    i++
  )
    (tagopt[i] = Number(
      "tag000000000000000000000000000000000000000000000000".charAt(i + 2)
    )),
      1 == tagopt[i]
        ? $("#tagCheck" + i).addClass("checkedTagOption")
        : $("#tagCheck" + i).removeClass("checkedTagOption");
  for (
    document.getElementById("saveID").value = 1,
      document.getElementById("Replace_Tag_1").value = "",
      document.getElementById("Replace_Tag_2").value = "",
      document.getElementById("Replace_Tag_3").value = "",
      document.getElementById("Replace_Tag_4").value = "",
      document.getElementById("Replace_Tag_5").value = "",
      document.getElementById("Replace_Tag_6").value = "",
      document.getElementById("Replace_Tag_7").value = "",
      document.getElementById("Replace_Tag_8").value = "",
      document.getElementById("Replace_Tag_9").value = "",
      document.getElementById("Replace_Tag_10").value = "",
      document.getElementById("Replace_Tag_11").value = "",
      document.getElementById("Replace_Tag_12").value = "",
      document.getElementById("Tag_Manager_1").value = "",
      document.getElementById("Tag_Manager_2").value = "",
      document.getElementById("Tag_Manager_3").value = "",
      document.getElementById("Tag_Manager_4").value = "",
      document.getElementById("Tag_Manager_5").value = "",
      i = 1;
    i <= hanytagoption;
    i++
  )
    $("#replacetext" + i).val(""),
      $("#replacewith" + i).val(""),
      $("#wheretoreplace" + i).val(1);
  for (i = 1; i <= hanyoption; i++) replaceaktiv[i] = Number(t.charAt(i + 8));
  actualizeReplaceket(),
    (n = Number(t.charAt(7))),
    Number(n) != Number(regex) && regexClick(),
    loadExternalCss("https://html6.com/editor.css"),
    (document.getElementById("externalcssfile").value = ""),
    $("#minimizedContainer div").trigger("click"),
    editorcssstyle.setValue(""),
    applyCssStyles(1);
}
function popupBox(e) {
  (document.getElementById("popupUzenet").innerHTML = e),
    (document.getElementById("popupUzenetBox").style.display = "block"),
    (document.getElementById("popupBoxShadow").style.display = "block");
}
function setAuxiliary(e) {
  $("html, body").animate({ scrollTop: 0 }, "slow"),
    (auxiliaryundotext = extractedEditorFricc.getValue()),
    auxiliaryOpen(),
    setTimeout(function () {
      extractedEditorFricc.setValue(e);
    }, 300);
}
function populateAuxiliaryWithMainContent() {
  setAuxiliary(sourceEditorFricc.getValue());
}
function auxiliaryOpen() {
  0 == auxopen &&
    ($(".wrapeditors").addClass("auxOpenWrap"),
    $("#auxiliaryEditor").addClass("auxOpen"),
    (auxopen = 1));
}
function auxiliaryClose() {
  1 == auxopen &&
    ($(".wrapeditors").removeClass("auxOpenWrap"),
    $("#auxiliaryEditor").removeClass("auxOpen"),
    (auxopen = 0));
}
function deleteDuplicates() {
  for (
    var e = extractedEditorFricc.getValue(),
      t = (auxiliaryundotext = e).split("\n"),
      o = t.length,
      n = new Array(),
      a = 0,
      i = 0,
      l = 0;
    l < o;
    l++
  ) {
    for (var r = (a = 0); r < l; r++) t[l] == t[r] && (a = 1);
    0 == a && (n[i++] = t[l]);
  }
  (e = n.join("\n")), extractedEditorFricc.setValue(e);
}
function alphabeticSort() {
  var e = extractedEditorFricc.getValue(),
    e = (auxiliaryundotext = e)
      .split("\n")
      .sort(function (e, t) {
        return e.toLowerCase().localeCompare(t.toLowerCase());
      })
      .join("\n");
  extractedEditorFricc.setValue(e);
}
function GetCookie(e) {
  for (
    var t = e + "=", o = t.length, n = document.cookie.length, a = 0;
    a < n;

  ) {
    var i = a + o;
    if (document.cookie.substring(a, i) == t) return "here";
    if (0 == (a = document.cookie.indexOf(" ", a) + 1)) break;
  }
  return null;
}
function removeFullScreenEditors() {
  $("#settingOption4").removeClass("checkedSett"),
    $("body").removeClass("fullScreenEditors"),
    (visualEditorHeight = 556),
    editortUjraInicializal(),
    $("#sourceFieldecske .CodeMirror").height(640);
}
function goFullScreenEditors() {
  $("body").addClass("fullScreenEditors"), $(".minimizePanel").trigger("click");
  var e = $("body").height();
  (visualEditorHeight = e - 230),
    editortUjraInicializal(),
    $("#sourceFieldecske .CodeMirror").height(e - 148),
    $("#settingOption4").removeClass("checkedSett"),
    $("#wrapEditorPlaceholder").css("min-height", "0px"),
    $("body").removeClass("dockEditors");
}
function helpetnyomott(e) {
  popupBox(
    14 == e
      ? '<h3>Settings</h3><p>Activate / disable certain features of the editor with the checkboxes.</p> <a target="_blank" href="/help/interface/settings/">More Details</a>'
      : 13 == e
      ? '<h3>Header</h3><ul><li>Links to main pages</li><li>Load demo content</li><li>Save and restore your settings</li><li>Access the auxiliary editor</li><li>Read your license information</li></ul> <a target="_blank" href="/help/interface/header/">More Details</a>'
      : 12 == e
      ? '<h3>Auxiliary Editor</h3><p>This is a secondary HTML editor where you can extract code and do other operations.</p> <a target="_blank" href="/help/interface/auxiliary-editor/">More Details</a>'
      : 11 == e
      ? '<h3>Convert To &lt;div&gt;</h3> <p>Convert tables and list tags to structured div elements. Make sure you use the CSS codes attached. </p><a target="_blank" href="/help/interface/convert-to-div/">More Details</a>'
      : 10 == e
      ? '<h3>Tag Attribute Filter</h3><p>Extract or delete the selected attributes from the desired tags.</p><a target="_blank" href="/help/interface/attribute-filter/">More Details</a>'
      : 9 == e
      ? '<h3>Lorem Ipsum Generator</h3><p>Generate gibberish filler text for the page. </p><a target="_blank" href="/help/interface/lorem-ipsum-generator/">More Details</a>'
      : 8 == e
      ? '<h3>Color Picker</h3><p>Pick a color from the palette and use it in the editor.</p><a target="_blank" href="/help/interface/color-picker/">More Details</a>'
      : 7 == e
      ? '<h3>Find And Replace</h3><p>Set one or more replace rules, decide where you want to apply them. Regular expressions are supported. </p><a target="_blank" href="/help/interface/find-and-replace/">More Details</a>'
      : 6 == e
      ? '<h3>Load External CSS File</h3><p>Specify the absolute URL of a CSS file and see how your code renders in the visual editor.</p><a target="_blank" href="/help/interface/css-styles/">More Details</a>'
      : 5 == e
      ? '<h3>Click And Copy</h3><p>Specify up to 4 code snippets or any text for easy and quick copy-paste into the HTML editor. </p><a target="_blank" href="/help/interface/click-and-copy/">More Details</a>'
      : 4 == e
      ? '<h3>Cleaning Options</h3><p>Check the options you want to perform when you press the main Clean button or execute them one by one.</p><a target="_blank" href="/help/interface/cleaning-options/">More Details</a>'
      : 3 == e
      ? '<h3>Tag Manager</h3> <p>Perform bulk operations with the predefined or any HTML tag. Choose to replace, delete the whole block, delete only the tag or delete the tag attributes only of the selected tags. <p><a target="_blank" href="/help/interface/tag-manager/">More Details</a>'
      : 2 == e
      ? 'FREE <br /><a target="_blank" href="#">more...</a>'
      : 1 == e
      ? '<h3>Tag Filter</h3><p>Extract or delete the filtered tags based on their name or whether or not they contain some attributes or content. <p><a href="/help/interface/tag-filter/">More Details</a>'
      : 0 == e
      ? '<h3>HTML Editor</h3><p>The visual editor on the left and the source editor on the right are linked together and the changes you make are reflected in both of them, whichever you are working with. Find the most important editing features above the WYSIWYG editor and below the syntax highlighted code editor.</p><a target="_blank" href="/help/interface/html-editor/">More Details</a>'
      : "No text specified"
  );
}
(_global.saveAs = saveAs.saveAs = saveAs),
  "undefined" != typeof module && (module.exports = saveAs),
  tinymce.init({
    selector: "textarea#elm1",
    valid_elements: validelements,
    force_p_newlines: !1,
    allow_unsafe_link_target: !0,
    force_br_newlines: !1,
    forced_root_block: forcedRootBlock,
    theme: "modern",
    convert_urls: !1,
    browser_spellcheck: spellCheckActive,
    content_css: contentcss,
    content_style: content_stilus,
    entity_encoding: "named",
    plugins: [
      "advlist autolink link image lists charmap print preview hr anchor",
      "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
      "table directionality emoticons paste textcolor",
    ],
    add_unload_trigger: !1,
    toolbar:
      "undo redo | code | removeformat | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent rtl | link image | print preview media fullpage | forecolor backcolor emoticons table",
    image_advtab: !0,
    style_formats: [
      { title: "Heading 1", format: "h1" },
      { title: "Heading 2", format: "h2" },
      { title: "Heading 3", format: "h3" },
      { title: "Heading 4", format: "h4" },
      { title: "Paragraph", format: "p" },
      { title: "Block Quote", format: "blockquote" },
      { title: "Red text", inline: "span", styles: { color: "#ff0000" } },
      { title: "Green text", block: "span", styles: { color: "#00ff00" } },
      { title: "Blue text", block: "span", styles: { color: "#0000ff" } },
    ],
    height: visualEditorHeight,
    branding: !1,
    setup: function (e) {
      e.on("change", function (e) {
        updateRight(1, "Tinymce change");
      }),
        e.on("keyup", function (e) {
          updateRight(1, "Tinymce keyup");
        }),
        e.on("undo", function (e) {
          updateRight(1, "Tinymce undo");
        }),
        e.on("redo", function (e) {
          updateRight(1, "Tinymce redo");
        }),
        e.on("focus", function (e) {
          wysiwygActive = 1;
        }),
        e.on("blur", function (e) {
          wysiwygActive = 0;
        });
    },
  }),
  $(function () {
    $(".CodeMirror").resizable({
      ghost: !0,
      animate: !0,
      minHeight: 70,
      minWidth: 50,
    });
  });
var demoContent =
  '<hr />\n<h1 class="aligncenter">We are moving from <strong>HTML<span style="background: #4485b8; color: #fff; padding: 0 5px 8px; border-radius: 0 0 20px 20px;">&nbsp;g&nbsp;</span></strong> to <strong>HTML<span style="background: #134e7b; color: #fff; padding: 3px 5px 5px; border-radius: 0 0 20px 20px;">&nbsp;6&nbsp;</span></strong></h1>\n<hr />\n<p class="aligncenter" style="font-size: 1.3em;">Beside changing one character in the URL, we have given the interface a minor facelift and incorporated new features that we believe will prove beneficial&nbsp;to&nbsp;you. <br />We welcome any feedback, so please do not hesitate to <a href="/contact/">get in touch&nbsp;with&nbsp;us</a>.</p>\n\x3c!-- ####### Comments are visible in the source editor ###### --\x3e\n<h3 style="color: #3271a2; font-size: 36px;">You can edit <span style="background-color: #3271a2; color: #ffffff; padding: 0 5px;">this demo</span> text!</h3>\n<p><strong style="color: #000;">Basic usage:</strong> Paste your documents in the visual editor on the left or your HTML code in the source editor in the right. <br />Edit any of the two areas and see the other changing in real time.&nbsp;</p>\n<h4>Use the table below to test most of the features</h4>\n<table class="editorDemoTable" style="vertical-align: top;">\n<thead>\n<tr>\n<td>Title</td>\n<td style="width: 42%;">Example 1</td>\n<td style="width: 42%;">Example 2</td>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style="min-width: 140px;"><strong>Inline styles</strong></td>\n<td>Using <span style="font-weight: bold; color: #000; text-decoration: underline;">inline styles</span> in your HTML document is a bad practice because <strong style="font-weight: normal; font-size: 1.1em; color: #00a; font-family: monospace; letter-spacing: -2px;">they break the default styles of the website</strong>!</td>\n<td>Use classes and IDs instead!\n<div style="height: 20px; width: 100%; border: 3px dotted #888; background-color: rgba(0,0,0,0.2);">&nbsp;</div>\n</td>\n</tr>\n<tr>\n<td><strong>Setting margins</strong></td>\n<td style="background-color: rgba(0,0,0,0.1);">\n<p>&nbsp;&nbsp;&nbsp;Do not use &nbsp; &nbsp; &nbsp; &nbsp;spaces &nbsp; &nbsp; &nbsp;or &nbsp; &nbsp; &nbsp; empty paragraphs</p>\n<p>&nbsp;</p>\n<p>&nbsp; &nbsp; &nbsp; &nbsp;to set vertical and horizontal &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; gaps.</p>\n</td>\n<td><span style="line-height: 35px;">&larr;| &nbsp;Use <span style="margin: 5px;">margin, &nbsp;&nbsp;</span> <span style="padding: 5px;">padding, &nbsp; &rarr;|</span> <br />and line-height instead <strong style="font-size: 20px;">↕</strong> </span></td>\n</tr>\n<tr>\n<td><strong>Links and images</strong></td>\n<td><a style="font-weight: bold; color: #000; cursor: pointer; text-decoration: underline;" title="Demo link" rel="nofollow" href="https://html-online.com" target="_blank">This is a text link</a> and this is an image: <img style="border: 2px solid #3271a2; border-radius: 15px;" src="/img/smiley.png" alt="laughing" width="20" height="20" /></td>\n<td>And this is a link image: <a style="cursor: pointer;" title="Image link" rel="nofollow" href="https://html6.com" target="_blank"><img src="/img/smiley.png" alt="smiley" /></a></td>\n</tr>\n<tr>\n<td><strong>Tables and lists</strong></td>\n<td>\n<table style="margin: auto; box-shadow: 3px 3px 10px #000;" border="1">\n<tbody>\n<tr style="border-top: 2px solid #555;">\n<td style="border: 2px dashed #555;">First cell</td>\n<td>Second column</td>\n<td>Upper corner</td>\n</tr>\n<tr style="background-color: rgba(0,0,0,0.1);">\n<td>Bottom row</td>\n<td>Middle bottom</td>\n<td>Right corner</td>\n</tr>\n</tbody>\n</table>\n</td>\n<td>\n<ol>\n<li>Demonstrating an ordered list</li>\n<li>These are&nbsp;special characters: <span style="color: red; font-size: 17px;">&hearts;</span> <strong style="font-size: 20px;">☺ ★</strong> &gt;&lt;</li>\n<li>item 2</li>\n</ol>\n</td>\n</tr>\n<tr>\n<td valign="top"><strong>Floating an image</strong></td>\n<td>\n<h4>Floating with inline style</h4>\n<p><img style="margin: 0 0 5px 20px; float: right;" src="https://html6.com/img/hero-400.png" alt="hero image" width="120" height="127" />We can float an image to the right assigning the "style" attribute and giving it the following value: <strong>margin: 0 0 5px 20px; float: right;</strong></p>\n</td>\n<td>\n<h4>Floating with classes</h4>\n<p><img class="imageRight" src="https://html6.com/img/hero-400.png" alt="hero image" width="120" height="127" />We need to avoid inline styles as much as possible. A more elegant way of floating an image along the text is through a class or ID attribute: <strong>class="imageRight"</strong></p>\n</td>\n</tr>\n</tbody>\n</table>\n<hr />\n<p>Set up the cleaning options and click the <span style="background-color: #3271a2; color: #fff; display: inline-block; padding: 2px 8px; font-weight: bold; border-radius: 5px;">Clean</span> button, try the <strong>Tag manager</strong>, or experiment with the <strong>Find and replace tool</strong>.</p>\n<p><em>You can always access this demonstration text clicking the <strong>DEMO</strong> menu item.</em></p>\n<hr />\n<h2 style="text-align: center;">Still Stuck With HTML5 Since&nbsp;2008?</h2>\n<h3 style="text-align: center;">It\'s&nbsp;time to start using&nbsp;HTML6!</h3>\n<div class="alignCenter">\n<div class="inlineBlock width400">\n<div class="inlineBlock width100">\n<p><img src="https://html6.com/img/editor.svg" alt="2 editors svg" /></p>\n</div>\n<div class="inlineBlock width200">\n<h3>What is HTML6?</h3>\n<p>The name might suggest that it is a new HTML version but it\'s even&nbsp;better.</p>\n<p>HTML6 is the next level <strong>HTML editor&nbsp;</strong>that will make your life&nbsp;easier and your work more&nbsp;efficient.</p>\n<p><a class="demoButton" rel="nofollow" href="https://html6.com/editor/">Try the free Demo</a></p>\n</div>\n</div>\n<div class="inlineBlock width400">\n<div class="inlineBlock width100">\n<p><img src="https://html6.com/img/license.svg" alt="g6 license" /></p>\n</div>\n<div class="inlineBlock width200">\n<h3>HTMLg Rebranded</h3>\n<p>We have been around <a rel="nofollow" href="https://web.archive.org/web/20151003110959/http://htmlg.com/" target="_blank">since 2015 </a> on <strong>HTMLg.com</strong>&nbsp;domain.</p>\n<p>Don\'t worry though, we\'re still hosting the <a rel="nofollow" href="https://html6.com/editor/">best HTML&nbsp;editor</a> possible, we just changed one character in&nbsp;the&nbsp;link.</p>\n<p><a class="demoButton" rel="nofollow" href="https://html6.com/license/">Purchase a License</a></p>\n</div>\n</div>\n</div>\n<div class="alignCenter">\n<div class="inlineBlock width500">\n<div class="inlineBlock width100">\n<p><img src="https://html6.com/img/hero-400.png" alt="shield logo" /></p>\n</div>\n<div class="inlineBlock width300">\n<h2>HTML6&nbsp;Editor</h2>\n<p>Converting documents to HTML or migrating content?<br />Automate web content editing tasks and make HTML composing Super Easy with our online editor.<br />Become Extremely Efficient and&nbsp;Error-Free!</p>\n</div>\n</div>\n</div>\n<h3>Main features</h3>\n<ul>\n<li><strong>Converter</strong> &ndash; Convert your Word and other visual documents to HTML&nbsp;instantly.</li>\n<li><strong>WYSIWYG</strong> &ndash; Create and edit content visually without needing to&nbsp;code.</li>\n<li><strong>Live Editors</strong> &ndash; Change the visual document and the code in&nbsp;real-time.</li>\n<li><strong>Cleaner</strong> &ndash; Set the cleaning options and execute them with a single&nbsp;click.</li>\n<li><strong>Easy To Use</strong> &ndash; Super user-friendly and we\'re always here to&nbsp;help.</li>\n<li><strong>No Ties</strong> &ndash; Purchasing a license is a one-time expense. No recurring&nbsp;payments.</li>\n</ul>\n<div class="alignCenter">\n<div class="inlineBlock">\n<div class="inlineBlock width100">\n<p><img src="https://html6.com/img/perfico.svg" alt="3 screens icon" /></p>\n</div>\n<div class="inlineBlock width250">\n<h2>Suitable for Everyone</h2>\n<h3>Easy to use</h3>\n<p>HTML6 was designed to be easy to use with a basic understanding of the HTML code.<br />It\'s a great tool for learning HTML markup.<br />With many useful free and premium&nbsp;features.</p>\n</div>\n</div>\n<div class="inlineBlock width400">\n<div class="inlineBlock width100">\n<p><img src="https://html6.com/img/flexico.svg" alt="mobile email svg" /></p>\n</div>\n<div class="inlineBlock width200">\n<h3>Easy access</h3>\n<ul>\n<li>No registration</li>\n<li>No download</li>\n<li>No installation</li>\n</ul>\n<p>HTML6 runs in your web browser accessing a web link, even if you have premium members\' access.</p>\n</div>\n</div>\n</div>\n<div class="alignCenter">\n<div class="inlineBlock width600">\n<div class="inlineBlock width200">\n<p><img src="https://html6.com/img/bnb.png" alt="html editor screenshot" /></p>\n</div>\n<div class="inlineBlock width300">\n<h2>Premium Features</h2>\n<p>For the price of a monthly beer you can access all features anytime without limitations, ads and annoying popups.</p>\n<ul>\n<li>No ads</li>\n<li>No character limit</li>\n<li>Save your settings</li>\n</ul>\n<p>One-time payment without automatic renewals.</p>\n<p><a class="demoButton" rel="nofollow" href="https://html6.com/license/">Premium Plans</a></p>\n</div>\n</div>\n</div>\n<h2>Features never seen before</h2>\n<p>The <strong>tag filter </strong>allows you to extract or delete certain parts of tags that match your&nbsp;criteria.<br />For example to list images that don\'t have <em>alt</em> attributes or delete outbound&nbsp;links.</p>\n<p><img src="https://html6.com/img/panel/tag-filter.png" alt="tag filter" style="display: block; margin-left: auto; margin-right: auto;" /></p>\n<p>The <strong>tag attribute filter </strong>lets you to list or get rid of certain attributes.<br />For example to extract all links or image files from the document.</p>\n<p><img src="https://html6.com/img/panel/tag-attribute-filter.png" alt="attribute filter" style="display: block; margin-left: auto; margin-right: auto;" /></p>\n<p>The <strong>tag manager </strong>bulk replaces and deletes your tags or their desired&nbsp;parts.<br />For example replaces tables with structured divs or deletes the tag attributes of spans&nbsp;etc.</p>\n<p><img src="https://html6.com/img/panel/html-tag-manager.png" alt="tag manager" style="display: block; margin-left: auto; margin-right: auto;" /></p>\n<h2 style="text-align: center;"><span>Still Not Convinced?</span></h2>\n<p style="text-align: center;">Try our demo and other free web design tools below.</p>\n<p style="text-align: center;"><a class="demoButton" rel="nofollow" href="https://html6.com/editor/">Try it for free</a> &nbsp;<span>or&nbsp; &nbsp;</span><a class="demoButton" rel="nofollow" href="https://html6.com/license/">Purchase a License</a></p>\n<h3>Useful Links</h3>\n<ul>\n<li><a rel="nofollow" href="https://html6.com/editor/"><strong> Compose </strong> &ndash; WYSIWYG HTML Editor&nbsp;&amp;&nbsp;Cleaner &ndash; <em> html6.com </em></a></li>\n<li><a rel="nofollow" href="https://htmlcheatsheet.com/"><strong> CheatSheets </strong> &ndash; Interactive HTML Cheat&nbsp;Sheet &ndash; <em> HTHL Cheat Sheet.com </em></a></li>\n<li><a rel="nofollow" href="https://html-css-js.com/"><strong> All In 1 </strong> &ndash; The client side of the&nbsp;web. &ndash; <em> html-css-js.com </em></a></li>\n<li><a rel="nofollow" href="https://htmltable.com/"><strong> Tables </strong> &ndash; Generate and style HTML&nbsp;Tables. &ndash; <em> HTMLtable.com </em></a></li>\n<li><a rel="nofollow" href="https://rgbcolorcode.com/"><strong> Color </strong> &ndash; Pick and mix the RGB&nbsp;Colors &ndash; <em> RGB Color Code.com </em></a></li>\n<li><a rel="nofollow" href="https://html-online.com/articles/"><strong> Blog </strong> &ndash; What\'s News in Wed&nbsp;Dev? &ndash; <em> HTML-Online.com </em></a></li>\n</ul>';
function getUrlVars() {
  var n = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (e, t, o) {
    n[t] = o;
  });
  return n;
}
function getUrlParam(e, t) {
  var o = t;
  return (
    -1 < window.location.href.indexOf(e) && (o = getUrlVars()[e]),
    null == o && (o = t),
    o
  );
}
function testFirstCookie() {
  null == GetCookie("FirstTimeVisitHere") &&
    ((t = new Date()),
    (t = new Date(t.getTime() + 7776e6)),
    (document.cookie = "FirstTimeVisitHere=here; expires=" + t),
    sourceEditorFricc.setValue(demoContent),
    inputChanged(0, "testFirstCookie"));
  var e = getUrlParam("html", "defaultValue"),
    t = getUrlParam("css", "");
  "defaultValue" != e &&
    ((e = (e = e.replaceAll("i$*$d", "id")).replaceAll("$**$", "&")),
    (t = (t = t.replaceAll("i$*$d", "id")).replaceAll("$**$", "&")),
    sourceEditorFricc.setValue(decodeURIComponent(e)),
    updateLeft(1, "testFirstCookie"),
    editorcssstyle.setValue(decodeURIComponent(t)),
    3 < t.length && applyCssStyles(1));
}
function loadDemoTxt() {
  closeDropdowns(),
    (treeViewCount = 0),
    (beforeDemoText = sourceEditorFricc.getValue()),
    sourceEditorFricc.setValue(demoContent),
    inputChanged(0, "loadDemoTxt"),
    updateRight(0, "loadDemoTxt");
}
function createCookie(e, t, o) {
  var n = o
    ? ((n = new Date()).setTime(n.getTime() + 24 * o * 60 * 60 * 1e3),
      "; expires=" + n.toGMTString())
    : "";
  document.cookie =
    encodeURIComponent(e) + "=" + encodeURIComponent(t) + n + "; path=/";
}
function readCookie(e) {
  for (
    var t = encodeURIComponent(e) + "=", o = document.cookie.split(";"), n = 0;
    n < o.length;
    n++
  ) {
    for (var a = o[n]; " " === a.charAt(0); ) a = a.substring(1, a.length);
    if (0 === a.indexOf(t))
      return decodeURIComponent(a.substring(t.length, a.length));
  }
  return null;
}
function eraseCookie(e) {
  createCookie(e, "", -1);
}
function backupRestoreNow() {
  "HTML6" != backuptext &&
    ((undotext = sourceEditorFricc.getValue()),
    sourceEditorFricc.setValue(backuptext),
    $("#backupIcon").addClass("backUpRestoreOk"),
    setTimeout(function () {
      $("#backupIcon").removeClass("backUpRestoreOk");
    }, 1e3));
}
function backupNow() {
  "" != sourceEditorFricc.getValue() &&
    ((backuptext = sourceEditorFricc.getValue()),
    $("#backupIcon").addClass("backedUp"),
    $("#backupIcon").addClass("backUpOk"),
    setTimeout(function () {
      $("#backupIcon").removeClass("backUpOk");
    }, 1e3));
}
function undoPressed() {
  (text = sourceEditorFricc.getValue()),
    sourceEditorFricc.setValue(undotext),
    (undotext = text),
    inputChanged(1, "undoPressed");
}
function updateRight(e, t) {
  var o = $("#sourceFieldecske .CodeMirror-scroll").scrollTop();
  (0 == linkedEditors && 1 == e) ||
    ((sourceScrolled = 1),
    sourceEditorFricc.setValue(tinymce.get("elm1").getContent()),
    (treeViewCount = 0),
    (sourceScrolled = 1)),
    $("#sourceFieldecske .CodeMirror-scroll").scrollTop(o),
    setTimeout(function () {
      $("#sourceFieldecske .CodeMirror-scroll").scrollTop(o);
    }, 10);
}
function updateLeft(e, t) {
  var o = sourceEditorFricc.getValue();
  o.includes("<body") &&
    popupBox(
      "<strong>&lt;body&gt; tag detected</strong><br>Please compose only the contents of the body section of your&nbsp;document.<br>The code between the opening and closing body&nbsp;tags:<br><em>&lt;body&gt; .... &lt;/body&gt;</em>"
    ),
    (0 == linkedEditors && 1 == e) ||
      (0 == wysiwygActive && tinyMCE.activeEditor.setContent(o),
      1 == scrollEditorsTogether &&
        0 != sourceEditorObject &&
        setVisualScroll(sourceEditorObject)),
    setTimeout(function () {
      var e = (e = $(".mce-wordcount").text()).replace(" words", "");
      (e = Number(e)),
        o.includes("html6") ||
          (999999e4 < e
            ? ($("#wordLimitReached").show(),
              $(".mce-wordcount").addClass("redLimit"))
            : ($("#wordLimitReached").hide(),
              $(".mce-wordcount").removeClass("redLimit")));
    }, 600);
}
function inputChanged(e, t) {
  var o = sourceEditorFricc.getValue().length;
  (document.getElementById("inputLength").innerHTML = o),
    updateLeft(e, "inputChanged " + t),
    999999e4 < o
      ? $("#inputLength").css({ color: "#AD2D3A", "font-weight": "bold" })
      : $("#inputLength").css({ color: "#444444", "font-weight": "normal" });
}
function deletePressed() {
  (undotext = sourceEditorFricc.getValue()),
    sourceEditorFricc.setValue(""),
    inputChanged(1, "deletePressed");
}
function actualizeReplaceket() {
  for (var e = 1; e < hanyoption + 1; e++)
    1 == replaceaktiv[e]
      ? (document.getElementById("replace" + e).style.display = "block")
      : (document.getElementById("replace" + e).style.display = "none");
  regrid();
}
function addRepField() {
  for (var e = 0, t = 1; 0 == e && t <= hanyoption + 1; )
    0 == replaceaktiv[t] && (e = replaceaktiv[t] = 1), t++;
  0 == e &&
    popupBox(
      "<strong>Limit reached.</strong><br>Maximum " +
        hanyoption +
        " replace rules."
    ),
    actualizeReplaceket(),
    console.log(replaceaktiv);
}
function regexClick() {
  if (0 == regex) {
    document.getElementById("regexpCheck").style.backgroundPosition =
      "3px -57px";
    for (var e = "segedvaltozo", t = (regex = 1); t < 11; t++)
      (e = "#wheretoreplace" + t), $(e).attr("disabled", !0), $(e).val("1");
  } else {
    document.getElementById("regexpCheck").style.backgroundPosition =
      "3px 11px";
    for (t = 1; t < 11; t++)
      (e = "#wheretoreplace" + t), $(e).attr("disabled", !1);
    regex = 0;
  }
}
function findandreplaceOne(e) {
  (undotext = tinymce.get("elm1").getContent()),
    (text = undotext),
    (hanyreplacevolt = 0);
  var t;
  1 == regex &&
    "" != $("#replacetext" + e).val() &&
    ((t = new RegExp($("#replacetext" + e).val(), "gim")),
    (text = text.replace(t, $("#replacewith" + e).val()))),
    0 == regex &&
      "" != $("#replacetext" + e).val() &&
      behelyettesit(
        $("#replacetext" + e).val(),
        $("#replacewith" + e).val(),
        $("#wheretoreplace" + e).val()
      ),
    sourceEditorFricc.setValue(text),
    tinyMCE.activeEditor.setContent(text),
    (document.getElementById("inputLength").innerHTML =
      "Source: " + text.length);
}
function findandreplacenow() {
  (undotext = tinymce.get("elm1").getContent()),
    (text = undotext),
    (hanyreplacevolt = 0);
  if (1 == regex)
    for (var e, t = 1; t <= hanyoption; t++)
      replaceaktiv[t] &&
        "" != $("#replacetext" + t).val() &&
        ((e = new RegExp($("#replacetext" + t).val(), "gim")),
        (text = text.replace(e, $("#replacewith" + t).val())));
  if (0 == regex)
    for (t = 1; t <= hanyoption; t++)
      replaceaktiv[t] &&
        "" != $("#replacetext" + t).val() &&
        behelyettesit(
          $("#replacetext" + t).val(),
          $("#replacewith" + t).val(),
          $("#wheretoreplace" + t).val()
        );
  sourceEditorFricc.setValue(text),
    tinyMCE.activeEditor.setContent(text),
    (document.getElementById("inputLength").innerHTML =
      "Source: " + text.length);
}
function deleteRepField(e) {
  $("#replacetext" + e).val(""),
    $("#replacewith" + e).val(""),
    (replaceaktiv[e] = 0),
    actualizeReplaceket();
}
function inicializalja() {
  1 == Number($("#idstoredindatabase").html()) &&
    (1 < $("#messageToUser").html().length &&
      popupBox($("#messageToUser").html()),
    0 != $("#isSuspendedLicense").html() &&
      $(".grid, #minimizedContainer").html("")),
    checkCookie();
  for (var e = 0; e <= 54; e++) (opt[e] = 0), (tagopt[e] = 0);
  (opt[1] = 1),
    (opt[2] = 1),
    (opt[3] = 1),
    (opt[4] = 1),
    (opt[5] = 1),
    (opt[6] = 1);
  for (var t = 0; t <= 20; t++)
    (panelWidth[t] = 500),
      (panelHeight[t] = 200),
      0 <= document.cookie.indexOf("elmentettszettingek" + t) &&
        (opt[t] = readCookie("elmentettszettingek" + t));
  for (t = 1; t <= 50; t++)
    0 <= document.cookie.indexOf("elmentetttagszettingek" + t) &&
      (tagopt[t] = readCookie("elmentetttagszettingek" + t));
  for (e = 0; e < hanyoption; e++)
    0 == opt[e]
      ? $("#optionButton" + e).removeClass("inactiveOptionButton")
      : $("#optionButton" + e).addClass("inactiveOptionButton");
  for (e = 1; e <= hanytagoption; e++)
    1 == tagopt[e]
      ? $("#tagCheck" + e).addClass("checkedTagOption")
      : $("#tagCheck" + e).removeClass("checkedTagOption");
  for (e = 2; e <= hanyoption; e++) replaceaktiv[e] = 0;
  (replaceaktiv[1] = 1),
    sourceEditorFricc.setSize("100%", 640),
    extractedEditorFricc.setSize("100%", 550),
    inputChanged(1, "inicializalja"),
    setTimeout(function () {
      testFirstCookie();
    }, 1e3);
}
function loadExternalCss(e) {
  contentcss = "https://html6.com/editor.css";
  var t = "ok";
  -1 == e.indexOf(".css") &&
    (t = "The external CSS file must have <strong>.css</strong> extension."),
    ("h" == e.charAt(0) &&
      "t" == e.charAt(1) &&
      "t" == e.charAt(2) &&
      "p" == e.charAt(3) &&
      "s" == e.charAt(4)) ||
      (t =
        "The link to the external CSS file should start with <strong>https</strong>"),
    e.length < 16 && (t = "Please specify a valid external CSS file URL."),
    "ok" != t ? popupBox(t) : ((contentcss = e), editortUjraInicializal());
}
var content_stilus = "";
function applyCssStyles(e) {
  (content_stilus = editorcssstyle.getValue()),
    0 != e && editortUjraInicializal();
}
function editortUjraInicializal() {
  tinyMCE.activeEditor.remove();
  var e = 1 == encoding ? "named" : "raw";
  tinymce.init({
    selector: "textarea#elm1",
    valid_elements: validelements,
    allow_unsafe_link_target: !0,
    force_p_newlines: !1,
    force_br_newlines: !1,
    forced_root_block: forcedRootBlock,
    theme: "modern",
    convert_urls: !1,
    browser_spellcheck: spellCheckActive,
    content_css: contentcss,
    content_style: content_stilus,
    entity_encoding: e,
    plugins: [
      "advlist autolink link image lists charmap print preview hr anchor",
      "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
      "table directionality emoticons paste textcolor",
    ],
    add_unload_trigger: !1,
    toolbar:
      "undo redo | code | removeformat | styleselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent rtl | link image | print preview media fullpage | forecolor backcolor emoticons table",
    image_advtab: !0,
    style_formats: [
      { title: "Heading 1", format: "h1" },
      { title: "Heading 2", format: "h2" },
      { title: "Heading 3", format: "h3" },
      { title: "Heading 4", format: "h4" },
      { title: "Paragraph", format: "p" },
      { title: "Block Quote", format: "blockquote" },
      { title: "Red text", inline: "span", styles: { color: "#ff0000" } },
      { title: "Green text", block: "span", styles: { color: "#00ff00" } },
      { title: "Blue text", block: "span", styles: { color: "#0000ff" } },
    ],
    height: visualEditorHeight,
    branding: !1,
    setup: function (e) {
      e.on("change", function (e) {
        updateRight(1, "Tinymce change");
      }),
        e.on("keyup", function (e) {
          updateRight(1, "Tinymce keyup");
        }),
        e.on("undo", function (e) {
          updateRight(1, "Tinymce undo");
        }),
        e.on("redo", function (e) {
          updateRight(1, "Tinymce redo");
        }),
        e.on("focus", function (e) {
          wysiwygActive = 1;
        }),
        e.on("blur", function (e) {
          wysiwygActive = 0;
        });
    },
  }),
    setTimeout(function () {
      tinyMCE.activeEditor.focus(),
        $("#elm1_ifr")
          .contents()
          .scroll(function () {
            setSourceScroll();
          });
    }, 2e3);
}
function openCTA() {
  //   $("#mainCTA").addClass("openCTA");
}
function closeCTA() {
  //   $("#mainCTA").removeClass("openCTA");
}
function recursiveCTA() {
  //   openCTA(),
  //     setTimeout(function () {
  //       recursiveCTA();
  //     }, 2e5);
}
function contentToURL() {
  var e = encodeURI(sourceEditorFricc.getValue());
  e = (e = e.replaceAll("id", "i$*$d")).replaceAll("&", "$**$");
  var t = encodeURI(editorcssstyle.getValue());
  t = (t = t.replaceAll("id", "i$*$d")).replaceAll("&", "$**$");
  var o = getUrlParam("id", "nothing"),
    o =
      "You don't have any HTML code in the editor! <br />There's nothing to save.";
  0 < e.length &&
    ((o = "<strong>Your HTML is"),
    0 < t.length && (o = "<strong>Your HTML and CSS are"),
    (o +=
      " saved to the link below.</strong><br>Use this link to share your document in the HTML6&nbsp;editor."),
    (o +=
      '<a class="savedLink" href="' +
      ("https://html6.com/editor/?html=" + e + "&css=" + t) +
      '" target="_blank">https://html6.com/editor/html=...</a>')),
    popupBox(o);
}
function egyOptiontVegrehajt(e) {
  (document.getElementById("popupBoxShadow").style.display = "block"),
    (undotext = tinymce.get("elm1").getContent()),
    (text = 1 == kuk ? " " : undotext);
  42 == e &&
    (1 == treeViewCount && (bekezdeseketRendezSECOND(), (treeViewCount = 2)),
    0 == treeViewCount && (bekezdeseketRendez(), (treeViewCount = 1)),
    2 == treeViewCount && (treeViewCount = 0),
    helyettesit(" \n", "\n"),
    helyettesit("\t\n", "\n"),
    helyettesit("\n\n", "\n"),
    helyettesit("  ", " "),
    helyettesit(" \n", "\n"),
    helyettesit("\t\n", "\n"),
    helyettesit("\n\n", "\n"),
    helyettesit("  ", " ")),
    15 == e &&
      (torolTagbanKettoKozt("<table", ">"),
      torolTagbanKettoKozt("<thead", ">"),
      helyettesit("<thead>", '<div class="divTableHeading">'),
      torolTagbanKettoKozt("<tfoot", ">"),
      torolTagbanKettoKozt("<tbody", ">"),
      torolTagbanKettoKozt("<td", ">"),
      torolTagbanKettoKozt("<tr", ">"),
      torolTagbanKettoKozt("<th", ">"),
      helyettesit("<table>", '<div class="divTable">'),
      helyettesit("<tbody>", '<div class="divTableBody">'),
      helyettesit("<tfoot>", '<div class="divTableFoot">'),
      helyettesit("<td>", '<div class="divTableCell">'),
      helyettesit("<tr>", '<div class="divTableRow">'),
      helyettesit("<th>", '<div class="divTableHead">'),
      helyettesit("</table>", "</div>"),
      helyettesit("</tbody>", "</div>"),
      helyettesit("</thead>", "</div>"),
      helyettesit("</tfoot>", "</div>"),
      helyettesit("</td>", "</div>"),
      helyettesit("</tr>", "</div>"),
      helyettesit("</th>", "</div>")),
    75 == e &&
      (torolTagbanKettoKozt("<ul", ">"),
      torolTagbanKettoKozt("<ol", ">"),
      torolTagbanKettoKozt("<li", ">"),
      torolTagbanKettoKozt("<dl", ">"),
      torolTagbanKettoKozt("<dt", ">"),
      torolTagbanKettoKozt("<dd", ">"),
      helyettesit("<ul>", '<div class="gUnordList">'),
      helyettesit("<ol>", '<div class="gOrdList">'),
      helyettesit("<li>", '<div class="gListItem">'),
      helyettesit("<dl>", '<div class="gDescriptionList">'),
      helyettesit("<dt>", '<div class="gDescriptionListItem">'),
      helyettesit("<dd>", '<div class="gDescription">'),
      helyettesit("</ul>", "</div>"),
      helyettesit("</ol>", "</div>"),
      helyettesit("</li>", "</div>"),
      helyettesit("</dl>", "</div>"),
      helyettesit("</dt>", "</div>"),
      helyettesit("</dd>", "</div>")),
    43 == e &&
      (helyettesit("\n", ""),
      torolTagbanKettoKozt("\x3c!--", "--\x3e"),
      helyettesit("\x3c!----\x3e", ""),
      (treeViewCount = 0)),
    8 == e &&
      (helyettesit("\x3c!--", "&%&%&%&%&%!--"),
      torolTagbanKettoKozt("<", ">"),
      helyettesit("<>", " "),
      helyettesit("&%&%&%&%&%!--", "\x3c!--")),
    1 == e &&
      (helyettesit("style = ", "style="),
      helyettesit("style= ", "style="),
      helyettesit("style =", "style="),
      torolTagbanKettoKozt('style="', '"'),
      helyettesit('style=""', ""),
      helyettesit("valign = ", "valign="),
      helyettesit("valign= ", "valign="),
      helyettesit("valign =", "valign="),
      torolTagbanKettoKozt('valign="', '"'),
      helyettesit('valign=""', ""),
      helyettesit("align = ", "align="),
      helyettesit("align= ", "align="),
      helyettesit("align =", "align="),
      torolTagbanKettoKozt('align="', '"'),
      helyettesit('align=""', "")),
    5 == e &&
      (helyettesit("&nbsp;&nbsp;", " "),
      helyettesit("&nbsp; ", " "),
      helyettesit(" &nbsp;", " ")),
    2 == e &&
      (helyettesit(" class = ", " class="),
      helyettesit(" class= ", " class="),
      helyettesit(" class =", " class="),
      torolTagbanKettoKozt(' class="', '"'),
      helyettesit(' class=""', ""),
      helyettesit(" id = ", " id="),
      helyettesit(" id= ", " id="),
      helyettesit(" id =", " id="),
      torolTagbanKettoKozt(' id="', '"'),
      helyettesit(' id=""', "")),
    6 == e &&
      (torolTagbanKettoKozt("\x3c!--", "--\x3e"),
      helyettesit("\x3c!----\x3e", "")),
    4 == e &&
      (helyettesit("> &nbsp;<", ">&nbsp;<"),
      helyettesit(">&nbsp; <", ">&nbsp;<"),
      csakEgyNbspTagotTorul()),
    3 == e &&
      (helyettesit("> <", "><"),
      helyettesit("> \n", ">\n"),
      helyettesit("></iframe>", ">iframe</iframe>"),
      uresTagotTorul(),
      csakEnteresTagotTorul()),
    7 == e && removeTagAttributes(),
    elkur(),
    sourceEditorFricc.setValue(text),
    tinyMCE.activeEditor.setContent(text),
    (document.getElementById("inputLength").innerHTML =
      "Source: " + text.length),
    setTimeout(function () {
      document.getElementById("popupBoxShadow").style.display = "none";
    }, 300);
}
function addToEnd(e) {
  (e = "ClickAndCopy" + e),
    console.log(e),
    (e = document.getElementById(e).value),
    console.log(e),
    sourceEditorFricc.setValue(tinymce.get("elm1").getContent() + e),
    inputChanged();
}
function encodingotvalt() {
  1 == encoding
    ? ((encoding = 0),
      (document.getElementById("characterEncoding").innerHTML = "x"))
    : ((encoding = 1),
      (document.getElementById("characterEncoding").innerHTML = "&#10003;")),
    editortUjraInicializal(),
    updateLeft(1, "encodingotvalt"),
    updateRight(1, "encodingotvalt");
}
function spellChecketValt(e) {
  1 == spellCheckActive
    ? ((spellCheckActive = !1), $("#settingOption6").removeClass("checkedSett"))
    : ((spellCheckActive = !0), $("#settingOption6").addClass("checkedSett")),
    1 == e &&
      (editortUjraInicializal(),
      updateLeft(1, "spellChecketValt"),
      updateRight(1, "spellChecketValt"));
}
function removeTagAttributes() {
  hossz = text.length;
  for (
    var e = text.split(""), t = new Array(""), o = 1, n = 0, a = 0;
    n < hossz;

  )
    "<" == e[n] &&
      ((o = 2),
      "!" == e[n + 1] && "-" == e[n + 2] && "-" == e[n + 3] && (o = 1),
      "a" == e[n + 1] && " " == e[n + 2] && (o = 4),
      "i" == e[n + 1] &&
        "m" == e[n + 2] &&
        "g" == e[n + 3] &&
        " " == e[n + 4] &&
        (o = 14)),
      " " == e[n] &&
        (2 == o && (o = 3),
        (4 != o && 5 != o) ||
          ("h" == e[n + 1] &&
            "r" == e[n + 2] &&
            "e" == e[n + 3] &&
            "f" == e[n + 4] &&
            (o = 6),
          "d" == e[n + 1] &&
            "o" == e[n + 2] &&
            "w" == e[n + 3] &&
            "n" == e[n + 4] &&
            "l" == e[n + 5] &&
            "o" == e[n + 6] &&
            "a" == e[n + 7] &&
            "d" == e[n + 8] &&
            (o = 6)),
        (14 != o && 15 != o) ||
          ("s" == e[n + 1] && "r" == e[n + 2] && "c" == e[n + 3] && (o = 16)),
        4 == o && (o = 5),
        8 == o && (o = 3),
        14 == o && (o = 15),
        18 == o && (o = 3)),
      '"' == e[n] && "7" == o && (o = 8),
      '"' == e[n] && "6" == o && (o = 7),
      '"' == e[n] && "17" == o && (o = 18),
      '"' == e[n] && "16" == o && (o = 17),
      (">" == e[n] || ("/" == e[n] && ">" == e[n + 1])) && (o = 1),
      (1 != o &&
        2 != o &&
        4 != o &&
        6 != o &&
        7 != o &&
        8 != o &&
        14 != o &&
        16 != o &&
        17 != o &&
        18 != o) ||
        ((t[a] = e[n]), a++),
      n++;
  text = t.join("");
}
function uresTagotTorul() {
  hossz = text.length;
  for (
    var e = text.split(""),
      t = new Array(""),
      o = 0,
      n = 0,
      a = 0,
      i = 0,
      l = 0;
    o < hossz;

  ) {
    if (
      (0 == a && "<" == e[o] && "/" != e[o + 1] && ((a = 1), (i = o)),
      2 == a && ">" == e[o])
    ) {
      for (l = 0; l <= o - i; l++) t[l + i] = "";
      (e[o] = ""), (a = 0);
    }
    1 == a &&
      ">" == e[o] &&
      (a =
        "/" != e[o - 2] && "/" != e[o - 1] && "<" == e[o + 1] && "/" == e[o + 2]
          ? 2
          : 0),
      (t[n] = e[o]),
      n++,
      o++;
  }
  text = t.join("");
}
function csakEnteresTagotTorul() {
  hossz = text.length;
  for (
    var e = text.split(""),
      t = new Array(""),
      o = 0,
      n = 0,
      a = 0,
      i = 0,
      l = 0;
    o < hossz;

  ) {
    if (
      (0 == a && "<" == e[o] && "/" != e[o + 1] && ((a = 1), (i = o)),
      2 == a && ">" == e[o])
    ) {
      for (l = 0; l <= o - i; l++) t[l + i] = "";
      (e[o] = ""), (a = 0);
    }
    1 == a &&
      ">" == e[o] &&
      (a =
        "/" != e[o - 2] &&
        "/" != e[o - 1] &&
        "\n" == e[o + 1] &&
        "<" == e[o + 2] &&
        "/" == e[o + 3]
          ? 2
          : 0),
      (t[n] = e[o]),
      n++,
      o++;
  }
  text = t.join("");
}
function csakEgyNbspTagotTorul() {
  hossz = text.length;
  for (
    var e = text.split(""),
      t = new Array(""),
      o = 0,
      n = 0,
      a = 0,
      i = 0,
      l = 0;
    o < hossz;

  ) {
    if (
      (0 == a && "<" == e[o] && "/" != e[o + 1] && ((a = 1), (i = o)),
      2 == a && ">" == e[o])
    ) {
      for (l = 0; l <= o - i; l++) t[l + i] = "";
      (e[o] = ""), (a = 0);
    }
    1 == a &&
      ">" == e[o] &&
      (a =
        "/" != e[o - 2] &&
        "/" != e[o - 1] &&
        "&" == e[o + 1] &&
        "n" == e[o + 2] &&
        "b" == e[o + 3] &&
        "s" == e[o + 4] &&
        "p" == e[o + 5] &&
        ";" == e[o + 6] &&
        "<" == e[o + 7] &&
        "/" == e[o + 8]
          ? 2
          : 0),
      (t[n] = e[o]),
      n++,
      o++;
  }
  text = t.join("");
}
function torolTagbanKettoKozt(e, t) {
  hossz = text.length;
  for (
    var o = e.length,
      n = t.length,
      a = text.split(""),
      i = e.split(""),
      l = t.split(""),
      r = 0,
      s = new Array(""),
      c = 1,
      d = 0,
      u = 0,
      p = 0,
      g = 0,
      m = 0;
    d < hossz;

  ) {
    if (("<" == a[d] && (r = 1), ">" == a[d] && (r = 0), 1 == r)) {
      for (g = 1, p = 0; p < o; p++) i[p] != a[d + p] && (g = 0);
      if (1 == g)
        for (m++, c = -999, d += o, p = 0; p < o; p++) (s[u] = i[p]), u++;
    }
    for (g = 1, p = 0; p < n; p++) l[p] != a[d + p] && (g = 0);
    1 == g && (c = 0), -999 != c && c++, 0 < c && ((s[u] = a[d]), u++), d++;
  }
  return (text = s.join("")), m;
}
function tTKKInclusive(e, t) {
  torolTagbanKettoKozt(e, t), helyettesit("eleje.concat(vege)", "");
}
function removeStilust() {
  hossz = text.length;
  for (
    var e = text.split(""), t = new Array(""), o = 1, n = 0, a = 0;
    n < hossz;

  )
    "s" == e[n] &&
      "t" == e[n + 1] &&
      "y" == e[n + 2] &&
      "l" == e[n + 3] &&
      "e" == e[n + 4] &&
      "=" == e[n + 5] &&
      '"' == e[n + 6] &&
      ((o = -999), (n += 6)),
      -999 == o && '"' == e[n + 1] && (o = -2),
      -999 != o && o++,
      0 < o && ((t[a] = e[n]), a++),
      n++;
  text = t.join("");
}
function helyettesit(e, t) {
  for (
    var o, n = 0, a = 0;
    (n = 0),
      (o = text.replace(e, t)) == text ? (n = 1) : a++,
      (text = o),
      0 == n;

  );
  return a;
}
function bekezdeseketRendez() {
  for (
    var e = 0,
      t = text.split(""),
      o = new Array(""),
      n = 0,
      a = 0,
      i = text.length,
      l = 0,
      r = 0,
      s = 0,
      c = 0;
    n < i;

  ) {
    if ("<" == t[n]) {
      if (
        ((s = r = 0),
        "!" == t[n + 1] &&
          "D" == t[n + 2] &&
          "O" == t[n + 3] &&
          "C" == t[n + 4] &&
          "T" == t[iz] &&
          (r = 1),
        "!" == t[n + 1] &&
          "d" == t[n + 2] &&
          "o" == t[n + 3] &&
          "c" == t[n + 4] &&
          "t" == t[iz] &&
          (r = 1),
        "L" == t[n + 1] &&
          "I" == t[n + 2] &&
          "N" == t[n + 3] &&
          "K" == t[n + 4] &&
          (r = 1),
        "!" == t[n + 1] && "-" == t[n + 2] && "-" == t[n + 3] && (r = 1),
        "l" == t[n + 1] &&
          "i" == t[n + 2] &&
          "n" == t[n + 3] &&
          "k" == t[n + 4] &&
          (r = 1),
        "M" == t[n + 1] &&
          "E" == t[n + 2] &&
          "T" == t[n + 3] &&
          "A" == t[n + 4] &&
          (r = 1),
        "m" == t[n + 1] &&
          "e" == t[n + 2] &&
          "t" == t[n + 3] &&
          "a" == t[n + 4] &&
          (r = 1),
        "B" == t[n + 1] &&
          "A" == t[n + 2] &&
          "S" == t[n + 3] &&
          "E" == t[n + 4] &&
          (r = 1),
        "b" == t[n + 1] &&
          "a" == t[n + 2] &&
          "s" == t[n + 3] &&
          "e" == t[n + 4] &&
          (r = 1),
        "B" == t[n + 1] && "R" == t[n + 2] && (r = 1),
        "b" == t[n + 1] && "r" == t[n + 2] && (r = 1),
        "c" == t[n + 1] && "o" == t[n + 2] && "l" == t[n + 3] && (r = 1),
        "C" == t[n + 1] && "O" == t[n + 2] && "L" == t[n + 3] && (r = 1),
        "c" == t[n + 1] &&
          "o" == t[n + 2] &&
          "m" == t[n + 3] &&
          "m" == t[n + 4] &&
          "a" == t[iz] &&
          (r = 1),
        "e" == t[n + 1] &&
          "m" == t[n + 2] &&
          "b" == t[n + 3] &&
          "e" == t[n + 4] &&
          (r = 1),
        "H" == t[n + 1] && "R" == t[n + 2] && (r = 1),
        "h" == t[n + 1] && "r" == t[n + 2] && (r = 1),
        "I" == t[n + 1] && "M" == t[n + 2] && "G" == t[n + 3] && (r = 1),
        "i" == t[n + 1] && "m" == t[n + 2] && "g" == t[n + 3] && (r = 1),
        "i" == t[n + 1] &&
          "n" == t[n + 2] &&
          "p" == t[n + 3] &&
          "u" == t[n + 4] &&
          (r = 1),
        "p" == t[n + 1] &&
          "a" == t[n + 2] &&
          "r" == t[n + 3] &&
          "a" == t[n + 4] &&
          (r = 1),
        "s" == t[n + 1] &&
          "o" == t[n + 2] &&
          "u" == t[n + 3] &&
          "r" == t[n + 4] &&
          (r = 1),
        "/" == t[n + 1])
      )
        s = 1;
      else
        for (l = n + 1; ">" != t[l] && l < i; )
          "/" == t[l] && ">" == t[l + 1] && (r = 1), l++;
      0 == r && 0 == s && e++, 1 == s && e--;
    }
    if (((c = 0), "\n" == t[n] && (c = 1), (o[a] = t[n]), a++, n++, 1 == c))
      if ("/" == t[n + 1]) for (l = 0; l < e - 1; l++) (o[a] = "\t"), a++;
      else for (l = 0; l < e; l++) (o[a] = "\t"), a++;
  }
  if ("\n" == o[0]) {
    for (n = 0; n < a; n++) o[n] = o[n + 1];
    o[n + 1] = "";
  }
  text = o.join("");
}
function bekezdeseketRendezSECOND() {
  var e = 0;
  hossz = text.length;
  for (
    var t = text.split(""),
      o = new Array(""),
      n = 0,
      a = 0,
      i = 0,
      l = 1,
      r = 0;
    n < hossz;

  ) {
    if (
      ("<" == t[n - 5] &&
        "!" == t[n - 4] &&
        "D" == t[n - 3] &&
        "O" == t[n - 2] &&
        "C" == t[n - 1] &&
        "T" == t[n] &&
        (r = 1),
      "<" == t[n - 5] &&
        "!" == t[n - 4] &&
        "d" == t[n - 3] &&
        "o" == t[n - 2] &&
        "c" == t[n - 1] &&
        "t" == t[n] &&
        (r = 1),
      "<" == t[n - 5] &&
        "L" == t[n - 4] &&
        "I" == t[n - 3] &&
        "N" == t[n - 2] &&
        "K" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 5] &&
        "l" == t[n - 4] &&
        "i" == t[n - 3] &&
        "n" == t[n - 2] &&
        "k" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 5] &&
        "M" == t[n - 4] &&
        "E" == t[n - 3] &&
        "T" == t[n - 2] &&
        "A" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 5] &&
        "m" == t[n - 4] &&
        "e" == t[n - 3] &&
        "t" == t[n - 2] &&
        "a" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 5] &&
        "B" == t[n - 4] &&
        "A" == t[n - 3] &&
        "S" == t[n - 2] &&
        "E" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 5] &&
        "b" == t[n - 4] &&
        "a" == t[n - 3] &&
        "s" == t[n - 2] &&
        "e" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 2] && "B" == t[n - 1] && "R" == t[n] && (r = 1),
      "<" == t[n - 2] && "b" == t[n - 1] && "r" == t[n] && (r = 1),
      "<" == t[n - 5] &&
        "c" == t[n - 4] &&
        "o" == t[n - 3] &&
        "l" == t[n - 2] &&
        (r = 1),
      "<" == t[n - 5] &&
        "C" == t[n - 4] &&
        "O" == t[n - 3] &&
        "L" == t[n - 2] &&
        (r = 1),
      "<" == t[n - 5] &&
        "c" == t[n - 4] &&
        "o" == t[n - 3] &&
        "m" == t[n - 2] &&
        "m" == t[n - 1] &&
        "a" == t[n] &&
        (r = 1),
      "<" == t[n - 5] &&
        "e" == t[n - 4] &&
        "m" == t[n - 3] &&
        "b" == t[n - 2] &&
        "e" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 2] && "H" == t[n - 1] && "R" == t[n] && (r = 1),
      "<" == t[n - 2] && "h" == t[n - 1] && "r" == t[n] && (r = 1),
      "<" == t[n - 5] &&
        "I" == t[n - 4] &&
        "M" == t[n - 3] &&
        "G" == t[n - 2] &&
        (r = 1),
      "<" == t[n - 5] &&
        "i" == t[n - 4] &&
        "m" == t[n - 3] &&
        "g" == t[n - 2] &&
        (r = 1),
      "<" == t[n - 5] &&
        "i" == t[n - 4] &&
        "n" == t[n - 3] &&
        "p" == t[n - 2] &&
        "u" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 5] &&
        "p" == t[n - 4] &&
        "a" == t[n - 3] &&
        "r" == t[n - 2] &&
        "a" == t[n - 1] &&
        (r = 1),
      "<" == t[n - 5] &&
        "s" == t[n - 4] &&
        "o" == t[n - 3] &&
        "u" == t[n - 2] &&
        "r" == t[n - 1] &&
        (r = 1),
      "<" == t[n] &&
        "s" == t[n + 1] &&
        "c" == t[n + 2] &&
        "r" == t[n + 3] &&
        "i" == t[n + 4] &&
        "p" == t[n + 5] &&
        "t" == t[n + 6])
    )
      for (
        ;
        "/" != t[n - 8] ||
        "s" != t[n - 7] ||
        "c" != t[n - 6] ||
        "r" != t[n - 5] ||
        "i" != t[n - 4] ||
        "p" != t[n - 3] ||
        "t" != t[n - 2] ||
        ">" != t[n - 1];

      )
        (o[a] = t[n]), a++, n++;
    if (
      "<" == t[n] &&
      "s" == t[n + 1] &&
      "t" == t[n + 2] &&
      "y" == t[n + 3] &&
      "l" == t[n + 4] &&
      "e" == t[n + 5]
    )
      for (
        ;
        "<" != t[n - 8] ||
        "/" != t[n - 7] ||
        "s" != t[n - 6] ||
        "t" != t[n - 5] ||
        "y" != t[n - 4] ||
        "l" != t[n - 3] ||
        "e" != t[n - 2] ||
        ">" != t[n - 1];

      )
        (o[a] = t[n]), a++, n++;
    if (
      ("<" == t[n - 3] &&
        "!" == t[n - 2] &&
        "-" == t[n - 1] &&
        "-" == t[n] &&
        0,
      "-" == t[n - 3] && "-" == t[n - 2] && ">" == t[n - 1] && 0,
      (l = 1),
      "<" == t[n] && "!" != t[n + 1])
    )
      if ("/" == t[n + 1]) {
        for (e--, o[a] = "\n", a++, i = 0; i < e; i++) (o[a] = "\t"), a++;
        e--;
      } else for (o[a] = "\n", a++, i = 0; i < e; i++) (o[a] = "\t"), a++;
    if (">" == t[n] && "-" != t[n - 1] && "]" != t[n - 1])
      if ("/" == t[n - 1])
        for (r = l = 0, o[a] = ">", o[a + 1] = "\n", a += 2, i = 0; i < e; i++)
          (o[a] = "\t"), a++;
      else
        for (
          (l = 0) == r && e++,
            r = 0,
            o[a] = ">",
            o[a + 1] = "\n",
            a += 2,
            i = 0;
          i < e;
          i++
        )
          (o[a] = "\t"), a++;
    1 == l && ((o[a] = t[n]), a++), n++;
  }
  if ("\n" == o[0]) {
    for (n = 0; n < a; n++) o[n] = o[n + 1];
    o[n + 1] = "";
  }
  text = o.join("");
}
function torolkettokoztmindent(e, t) {
  hossz = text.length;
  for (
    var o = e.length,
      n = t.length,
      a = text.split(""),
      i = e.split(""),
      l = t.split(""),
      r = new Array(""),
      s = 1,
      c = 0,
      d = 0,
      u = 1,
      p = 0;
    c < hossz;

  ) {
    if (1 == s) {
      for (u = 1, p = 0; p < o; p++) a[c + p] != i[p] && (u = 0);
      1 == u && ((s = -9), (c += o));
    }
    if (-9 == s) {
      for (u = 1, p = 0; p < n; p++) a[c + p] != l[p] && (u = 0);
      1 == u && ((s = 1), (c += n));
    }
    0 < s && ((r[d] = a[c]), d++), c++;
  }
  text = r.join("");
}
function toroltagbanmindent(e) {
  hossz = text.length;
  for (
    var t = e.length,
      o = text.split(""),
      n = e.split(""),
      a = new Array(""),
      i = 0,
      l = 0,
      r = 0,
      s = 1,
      c = 0;
    l < hossz;

  ) {
    if ("<" == o[l]) {
      for (s = 1, c = 0; c < t; c++) o[l + c + 1] != n[c] && (s = 0);
      1 == s && (i++, (l += t));
    }
    if ("<" == o[l] && "/" == o[l + 1]) {
      for (s = 1, c = 0; c < t; c++) o[l + c + 2] != n[c] && (s = 0);
      1 == s && (i--, (l = l + t + 3));
    }
    0 == i && ((a[r] = o[l]), r++), l++;
  }
  text = a.join("");
}
var singleton = [
  "area",
  "br",
  "col",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
];
function inputDelete(e) {
  inputValidator(e) &&
    (0 <= singleton.indexOf(document.getElementById(e).value)
      ? (torolkettokoztmindent("<" + document.getElementById(e).value, "/>"),
        torolkettokoztmindent("<" + document.getElementById(e).value, "/>"))
      : toroltagbanmindent(document.getElementById(e).value));
}
function inputReplace(e, t) {
  var o = 1;
  0 <= singleton.indexOf(document.getElementById(t).value) &&
    ((o = 0),
    popupBox(
      document.getElementById(t).value +
        " is a singleton HTML tag so it cannot be used for replacement.<br /><em>(It has no closing tag)</em>"
    )),
    0 <= singleton.indexOf(document.getElementById(e).value) &&
      ((o = 0),
      popupBox(
        document.getElementById(e).value +
          " is a singleton HTML tag so it cannot be replaced.<br /><em>(It has no closing tag)</em>"
      )),
    inputValidator(t) &&
      inputValidator(e) &&
      1 == o &&
      (helyettesit(
        "<" + document.getElementById(e).value + ">",
        "<" + document.getElementById(t).value + ">"
      ),
      helyettesit(
        "<" + document.getElementById(e).value + " ",
        "<" + document.getElementById(t).value + " "
      ),
      helyettesit(
        "</" + document.getElementById(e).value + ">",
        "</" + document.getElementById(t).value + ">"
      ));
}
function inputDeleteAttrib(e) {
  inputValidator(e) &&
    (torolTagbanKettoKozt("<" + document.getElementById(e).value + " ", ">"),
    helyettesit(
      "<" + document.getElementById(e).value + " ",
      "<" + document.getElementById(e).value
    ));
}
function executeCheckedTags() {
  (undotext = tinymce.get("elm1").getContent()),
    (text = 1 == kuk ? " " : undotext);
  1 == tagopt[1] &&
    inputValidator("Replace_Tag_1") &&
    (helyettesit(
      "<iframe",
      "<" + document.getElementById("Replace_Tag_1").value
    ),
    helyettesit(
      "</iframe",
      "</" + document.getElementById("Replace_Tag_1").value
    )),
    1 == tagopt[5] &&
      inputValidator("Replace_Tag_2") &&
      (helyettesit(
        "<table",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</table",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "<tbody",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</tbody",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "<thead",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</thead",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "<foot",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</foot",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit("<tr", "<" + document.getElementById("Replace_Tag_2").value),
      helyettesit(
        "</tr",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit("<td", "<" + document.getElementById("Replace_Tag_2").value),
      helyettesit(
        "</td",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit("<th", "<" + document.getElementById("Replace_Tag_2").value),
      helyettesit(
        "</th",
        "</" + document.getElementById("Replace_Tag_2").value
      )),
    1 == tagopt[9] &&
      inputValidator("Replace_Tag_3") &&
      (helyettesit(
        "<a>",
        "<" + document.getElementById("Replace_Tag_3").value + ">"
      ),
      helyettesit(
        "<a ",
        "<" + document.getElementById("Replace_Tag_3").value + " "
      ),
      helyettesit(
        "</a>",
        "</" + document.getElementById("Replace_Tag_3").value + ">"
      )),
    1 == tagopt[13] &&
      inputValidator("Replace_Tag_4") &&
      (helyettesit(
        "<span",
        "<" + document.getElementById("Replace_Tag_4").value
      ),
      helyettesit(
        "</span",
        "</" + document.getElementById("Replace_Tag_4").value
      )),
    1 == tagopt[17] &&
      inputValidator("Replace_Tag_5") &&
      (helyettesit(
        "<img",
        "<" + document.getElementById("Replace_Tag_5").value
      ),
      helyettesit(
        "</img",
        "</" + document.getElementById("Replace_Tag_5").value
      )),
    1 == tagopt[21] &&
      inputValidator("Replace_Tag_6") &&
      (helyettesit(
        "<form",
        "<" + document.getElementById("Replace_Tag_6").value
      ),
      helyettesit(
        "</form",
        "</" + document.getElementById("Replace_Tag_6").value
      )),
    1 == tagopt[25] &&
      inputValidator("Replace_Tag_7") &&
      (helyettesit("<ul", "<" + document.getElementById("Replace_Tag_7").value),
      helyettesit(
        "</ul",
        "</" + document.getElementById("Replace_Tag_7").value
      ),
      helyettesit("<ol", "<" + document.getElementById("Replace_Tag_7").value),
      helyettesit(
        "</ol",
        "</" + document.getElementById("Replace_Tag_7").value
      )),
    1 == tagopt[29] && inputReplace("Tag_Manager_1", "Replace_Tag_8"),
    1 == tagopt[33] && inputReplace("Tag_Manager_2", "Replace_Tag_9"),
    1 == tagopt[37] && inputReplace("Tag_Manager_3", "Replace_Tag_10"),
    1 == tagopt[41] && inputReplace("Tag_Manager_4", "Replace_Tag_11"),
    1 == tagopt[45] && inputReplace("Tag_Manager_5", "Replace_Tag_12"),
    1 == tagopt[2] && torolkettokoztmindent("<iframe", "</iframe>"),
    1 == tagopt[6] && toroltagbanmindent("table"),
    1 == tagopt[10] &&
      (torolkettokoztmindent("<a ", "</a>"),
      torolkettokoztmindent("<a>", "</a>")),
    1 == tagopt[14] && toroltagbanmindent("span"),
    1 == tagopt[18] && torolkettokoztmindent("<img", "/>"),
    1 == tagopt[22] && toroltagbanmindent("form"),
    1 == tagopt[26] && (toroltagbanmindent("ul"), toroltagbanmindent("ol")),
    1 == tagopt[30] && inputDelete("Tag_Manager_1"),
    1 == tagopt[34] && inputDelete("Tag_Manager_2"),
    1 == tagopt[38] && inputDelete("Tag_Manager_3"),
    1 == tagopt[42] && inputDelete("Tag_Manager_4"),
    1 == tagopt[46] && inputDelete("Tag_Manager_5"),
    1 == tagopt[3] && removeTag("iframe"),
    1 == tagopt[7] && torulTablazatot(),
    1 == tagopt[11] && removeTag("a"),
    1 == tagopt[15] && removeTag("span"),
    1 == tagopt[19] && removeTag("img"),
    1 == tagopt[23] && removeTag("form"),
    1 == tagopt[27] && torulListat(),
    1 == tagopt[31] &&
      inputValidator("Tag_Manager_1") &&
      removeTag(document.getElementById("Tag_Manager_1").value),
    1 == tagopt[35] &&
      inputValidator("Tag_Manager_2") &&
      removeTag(document.getElementById("Tag_Manager_2").value),
    1 == tagopt[39] &&
      inputValidator("Tag_Manager_3") &&
      removeTag(document.getElementById("Tag_Manager_3").value),
    1 == tagopt[43] &&
      inputValidator("Tag_Manager_4") &&
      removeTag(document.getElementById("Tag_Manager_4").value),
    1 == tagopt[47] &&
      inputValidator("Tag_Manager_5") &&
      removeTag(document.getElementById("Tag_Manager_5").value),
    1 == tagopt[4] && torolTagbanKettoKozt("<iframe", ">"),
    1 == tagopt[8] &&
      (torolTagbanKettoKozt("<table", ">"),
      torolTagbanKettoKozt("<tbody", ">"),
      torolTagbanKettoKozt("<thead", ">"),
      torolTagbanKettoKozt("<foot", ">"),
      torolTagbanKettoKozt("<tr", ">"),
      torolTagbanKettoKozt("<td", ">"),
      torolTagbanKettoKozt("<th", ">")),
    1 == tagopt[12] &&
      (torolTagbanKettoKozt("<a ", ">"), helyettesit("<a >", "<a>")),
    1 == tagopt[16] && torolTagbanKettoKozt("<span", ">"),
    1 == tagopt[20] && torolTagbanKettoKozt("<img", ">"),
    1 == tagopt[24] &&
      (torolTagbanKettoKozt("<form", ">"),
      torolTagbanKettoKozt("<input", ">"),
      torolTagbanKettoKozt("<textarea", ">"),
      torolTagbanKettoKozt("<button", ">"),
      torolTagbanKettoKozt("<select", ">"),
      torolTagbanKettoKozt("<option", ">"),
      torolTagbanKettoKozt("<optiongroup", ">"),
      torolTagbanKettoKozt("<fieldset", ">"),
      torolTagbanKettoKozt("<label", ">")),
    1 == tagopt[28] &&
      (torolTagbanKettoKozt("<ul", ">"),
      torolTagbanKettoKozt("<ol", ">"),
      torolTagbanKettoKozt("<li", ">")),
    1 == tagopt[32] && inputDeleteAttrib("Tag_Manager_1"),
    1 == tagopt[36] && inputDeleteAttrib("Tag_Manager_2"),
    1 == tagopt[40] && inputDeleteAttrib("Tag_Manager_3"),
    1 == tagopt[44] && inputDeleteAttrib("Tag_Manager_4"),
    1 == tagopt[48] && inputDeleteAttrib("Tag_Manager_5"),
    elkur(),
    sourceEditorFricc.setValue(text),
    tinyMCE.activeEditor.setContent(text),
    (document.getElementById("inputLength").innerHTML =
      "Source: " + text.length);
}
function tagAttributeFilter() {
  (treeViewCount = 0),
    (undotext = tinymce.get("elm1").getContent()),
    (text = 1 == kuk ? " " : undotext);
  var e = (e = document.getElementById(
    "FilterAttribute_Tag"
  ).value).toLowerCase();
  document.getElementById("FilterAttribute_Tag").value = e;
  var t = (t = document.getElementById(
    "FilterAttribute_Filter"
  ).value).toLowerCase();
  document.getElementById("FilterAttribute_Filter").value = t;
  var o = text.length,
    n = e.length,
    a = t.length,
    i = text.split(""),
    l = e.split(""),
    r = t.split(""),
    s = new Array(""),
    c = new Array(""),
    d = 0,
    u = 1,
    p = 0,
    g = 0,
    m = 0,
    h = 0,
    f = 0,
    y = 0;
  if (1 == attributeFilterType.value) {
    for (; p < o; ) {
      if ("<" == i[p] && "!" != i[p + 1])
        if (0 < n) {
          for (h = 1, m = 0; m < n; m++) l[m] != i[p + m + 1] && (h = 0);
          y = 1 == h ? 1 : 0;
        } else y = 1;
      if (1 == y)
        if (0 == a) (u = 86), (y = 0), f++, (c[d] = "\n"), d++;
        else {
          for (h = 1, m = 0; m < a; m++) r[m] != i[p + m] && (h = 0);
          " " != i[p - 1] && (h = 0),
            1 == h && ((p = p + a + 2), (u = -999), f++, (c[d] = "\n"), d++);
        }
      if (86 == u && " " == i[p])
        for (; ">" != i[p] && ("/" != i[p] || ">" != i[p + 1]); )
          (c[d] = i[p]), p++, d++;
      ">" == i[p] && ((y = 0), (u = 1)),
        0 < u && ((s[g] = i[p]), g++),
        -999 == u && '"' == i[p] && (u = 1),
        u < 0 && ((c[d] = i[p]), d++),
        p++;
    }
    (text = (text = (text = c.join("")).replace(/\n\s*\n/g, "\n")).substr(1)),
      0 < f && setAuxiliary(text);
  }
  if (2 == attributeFilterType.value) {
    for (; p < o; ) {
      if ("<" == i[p] && "!" != i[p + 1])
        if (0 < n) {
          for (h = 1, m = 0; m < n; m++) l[m] != i[p + m + 1] && (h = 0);
          y = 1 == h ? 1 : 0;
        } else y = 1;
      if (1 == y)
        if (0 == a) (u = 86), (y = 0), f++;
        else {
          for (h = 1, m = 0; m < a; m++) r[m] != i[p + m] && (h = 0);
          " " != i[p - 1] && (h = 0),
            1 == h && ((p = p + a + 2), (u = -999), f++);
        }
      if (86 == u && " " == i[p])
        for (; ">" != i[p] && ("/" != i[p] || ">" != i[p + 1]); ) p++;
      ">" == i[p] && ((y = 0), (u = 1)),
        0 < u && ((s[g] = i[p]), g++),
        -999 == u && '"' == i[p] && (u = 1),
        p++;
    }
    (text = s.join("")),
      elkur(),
      sourceEditorFricc.setValue(text),
      tinyMCE.activeEditor.setContent(text),
      (document.getElementById("inputLength").innerHTML =
        "Source: " + text.length);
  }
  0 == f &&
    (document.getElementById("howmanyfilteredAttribute").innerHTML =
      "No match found"),
    1 == f &&
      (document.getElementById("howmanyfilteredAttribute").innerHTML =
        "1 attribute filtered"),
    1 < f &&
      (document.getElementById("howmanyfilteredAttribute").innerHTML =
        f + " attributes filtered");
}
function tagFilter() {
  updateRight(1, "tagFilter"),
    (treeViewCount = 0),
    (undotext = tinymce.get("elm1").getContent()),
    (text = 1 == kuk ? " " : undotext);
  var e = document.getElementById("filterExtOrDel").value,
    t = (t = document.getElementById("Filter_Tag").value).toLowerCase();
  document.getElementById("Filter_Tag").value = t;
  var o = document.getElementById("filterTagOrCont").value,
    n = document.getElementById("filterContainOrNot").value,
    a = document.getElementById("Filter_Filter").value,
    i = document.getElementById("filterAttributeWhereToLook").value;
  hossz = text.length;
  var l,
    r = t.length,
    s = a.length,
    c = text.split(""),
    d = t.split(""),
    u = (a.split(""), new Array("")),
    p = 0,
    g = 0,
    m = 0,
    h = 0,
    f = 0,
    y = 0,
    v = 0,
    b = 0,
    T = 0,
    k = 0,
    x = 0,
    E = 0,
    w = 0,
    _ = 0,
    C = 0,
    I = r,
    B = 0,
    $ = 0;
  if (2 == e) for (; g < hossz; ) (u[g] = c[g]), g++;
  for (g = 0; g < hossz; ) {
    if ("<" == c[g] && "!" != c[g + 1] && "/" != c[g + 1]) {
      if (0 < I) {
        for (y = 1, m = 0; m < r; m++) d[m] != c[g + m + 1] && (y = 0);
        " " != c[g + r + 1] && ">" != c[g + r + 1] && (y = 0),
          (b = 1 == y ? 1 : 0);
      } else {
        for (
          b = 1, d = [], m = r = 0;
          " " != c[g + m + 1] && ">" != c[g + m + 1];

        )
          (d[m] = c[g + m + 1]), m++;
        r = m;
      }
      if (1 == b) {
        for (T = l = g, _ = C = 0; ">" != c[T] && T <= hossz; )
          "/" == c[++T] && ">" == c[T + 1] && (_ = 1);
        if (((x = k = T), 0 == _))
          for (h = T + 1, k = 0; 0 == k && h <= hossz; ) {
            if ("<" == c[h] && "/" != c[h + 1]) {
              for (f = h, B = 0; ">" != c[f] && f <= hossz; ) f++;
              if (("/" == c[f - 1] && (B = 1), 0 == B)) {
                for (y = 1, m = 0; m < r; m++) d[m] != c[m + h + 1] && (y = 0);
                1 == y && C++;
              }
            }
            if ("<" == c[h] && "/" == c[h + 1]) {
              for (y = 1, m = 0; m < r; m++) d[m] != c[h + m + 2] && (y = 0);
              ">" != c[h + m + 2] && (y = 0),
                1 == y && -1 == --C && (x = (k = h) + r + 2);
            }
            h++;
          }
        w = 1;
        if (
          ((E = 1),
          0 < s &&
            ((E = w = 0),
            -1 <
              c
                .slice(T + 1, k)
                .join("")
                .indexOf(a) && (w = 1),
            -1 <
              c
                .slice(l + 1, T)
                .join("")
                .indexOf(a) && (E = 1)),
          ($ = 0),
          1 == i && 1 == E && ($ = 1),
          2 == i && 1 == w && ($ = 1),
          2 == n && ($ = 1 == (m = $) ? 0 : 1),
          1 == $)
        ) {
          if ((v++, 1 == e))
            if (((u[p++] = "\n"), 0 == _)) {
              if (1 == o) {
                for (m = l; m <= T; m++) u[p++] = c[m];
                for (m = k; m <= x; m++) u[p++] = c[m];
              }
              if (2 == o) for (m = l + r + 1; m < T; m++) u[p++] = c[m];
              if (3 == o) for (m = T + 1; m < k; m++) u[p++] = c[m];
              if (4 == o) for (m = l; m <= x; m++) u[p++] = c[m];
            } else if (2 == o) for (m = l + r + 1; m < T; m++) u[p++] = c[m];
            else for (m = l; m <= x; m++) u[p++] = c[m];
          if (2 == e)
            if (0 == _) {
              if (1 == o) {
                for (m = l; m <= T; m++) u[m] = "";
                for (m = k; m <= x; m++) u[m] = "";
              }
              if (2 == o) for (m = l + r + 1; m < T; m++) u[m] = "";
              if (3 == o) for (m = T + 1; m < k; m++) u[m] = "";
              if (4 == o) for (m = l; m <= x; m++) u[m] = "";
            } else if (2 == o) for (m = l + r + 1; m < T; m++) u[m] = "";
            else for (m = l; m <= x; m++) u[m] = "";
        }
      }
    }
    g++;
  }
  return (
    (text = u.join("")),
    elkur(),
    1 == e &&
      ((text = (text = text.replace(/\n\s*\n/g, "\n")).substr(1)),
      0 < v && setAuxiliary(text)),
    2 == e &&
      (sourceEditorFricc.setValue(text),
      tinyMCE.activeEditor.setContent(text),
      (document.getElementById("inputLength").innerHTML =
        "Source: " + text.length)),
    0 == v &&
      (document.getElementById("howmanyfiltered").innerHTML = "No match found"),
    0 < v &&
      (document.getElementById("howmanyfiltered").innerHTML =
        1 == e ? v + " extracted" : v + " deleted"),
    v
  );
}
function tagManagerOption(e) {
  (document.getElementById("popupBoxShadow").style.display = "block"),
    (treeViewCount = 0),
    (undotext = tinymce.get("elm1").getContent()),
    (text = 1 == kuk ? " " : undotext);
  11 == e &&
    inputValidator("Replace_Tag_1") &&
    (helyettesit(
      "<iframe",
      "<" + document.getElementById("Replace_Tag_1").value
    ),
    helyettesit(
      "</iframe",
      "</" + document.getElementById("Replace_Tag_1").value
    )),
    21 == e &&
      inputValidator("Replace_Tag_2") &&
      (helyettesit(
        "<table",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</table",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "<tbody",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</tbody",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "<thead",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</thead",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "<foot",
        "<" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit(
        "</foot",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit("<tr", "<" + document.getElementById("Replace_Tag_2").value),
      helyettesit(
        "</tr",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit("<td", "<" + document.getElementById("Replace_Tag_2").value),
      helyettesit(
        "</td",
        "</" + document.getElementById("Replace_Tag_2").value
      ),
      helyettesit("<th", "<" + document.getElementById("Replace_Tag_2").value),
      helyettesit(
        "</th",
        "</" + document.getElementById("Replace_Tag_2").value
      )),
    31 == e &&
      inputValidator("Replace_Tag_3") &&
      (helyettesit(
        "<a>",
        "<" + document.getElementById("Replace_Tag_3").value + ">"
      ),
      helyettesit(
        "<a ",
        "<" + document.getElementById("Replace_Tag_3").value + " "
      ),
      helyettesit(
        "</a>",
        "</" + document.getElementById("Replace_Tag_3").value + ">"
      )),
    41 == e &&
      inputValidator("Replace_Tag_4") &&
      (helyettesit(
        "<span",
        "<" + document.getElementById("Replace_Tag_4").value
      ),
      helyettesit(
        "</span",
        "</" + document.getElementById("Replace_Tag_4").value
      )),
    51 == e &&
      inputValidator("Replace_Tag_5") &&
      (helyettesit(
        "<img",
        "<" + document.getElementById("Replace_Tag_5").value
      ),
      helyettesit(
        "</img",
        "</" + document.getElementById("Replace_Tag_5").value
      )),
    61 == e &&
      inputValidator("Replace_Tag_6") &&
      (helyettesit(
        "<form",
        "<" + document.getElementById("Replace_Tag_6").value
      ),
      helyettesit(
        "</form",
        "</" + document.getElementById("Replace_Tag_6").value
      )),
    71 == e &&
      inputValidator("Replace_Tag_7") &&
      (helyettesit("<ul", "<" + document.getElementById("Replace_Tag_7").value),
      helyettesit(
        "</ul",
        "</" + document.getElementById("Replace_Tag_7").value
      ),
      helyettesit("<ol", "<" + document.getElementById("Replace_Tag_7").value),
      helyettesit(
        "</ol",
        "</" + document.getElementById("Replace_Tag_7").value
      )),
    81 == e && inputReplace("Tag_Manager_1", "Replace_Tag_8"),
    91 == e && inputReplace("Tag_Manager_2", "Replace_Tag_9"),
    101 == e && inputReplace("Tag_Manager_3", "Replace_Tag_10"),
    111 == e && inputReplace("Tag_Manager_4", "Replace_Tag_11"),
    121 == e && inputReplace("Tag_Manager_5", "Replace_Tag_12"),
    12 == e && torolkettokoztmindent("<iframe", "</iframe>"),
    22 == e && toroltagbanmindent("table"),
    32 == e &&
      (torolkettokoztmindent("<a ", "</a>"),
      torolkettokoztmindent("<a>", "</a>")),
    42 == e && toroltagbanmindent("span"),
    52 == e && torolkettokoztmindent("<img", "/>"),
    62 == e && toroltagbanmindent("form"),
    72 == e && (toroltagbanmindent("ul"), toroltagbanmindent("ol")),
    82 == e && inputDelete("Tag_Manager_1"),
    92 == e && inputDelete("Tag_Manager_2"),
    102 == e && inputDelete("Tag_Manager_3"),
    112 == e && inputDelete("Tag_Manager_4"),
    122 == e && inputDelete("Tag_Manager_5"),
    13 == e && removeTag("iframe"),
    23 == e && torulTablazatot(),
    33 == e && removeTag("a"),
    43 == e && removeTag("span"),
    53 == e && removeTag("img"),
    63 == e && removeTag("form"),
    73 == e && torulListat(),
    83 == e &&
      inputValidator("Tag_Manager_1") &&
      removeTag(document.getElementById("Tag_Manager_1").value),
    93 == e &&
      inputValidator("Tag_Manager_2") &&
      removeTag(document.getElementById("Tag_Manager_2").value),
    103 == e &&
      inputValidator("Tag_Manager_3") &&
      removeTag(document.getElementById("Tag_Manager_3").value),
    113 == e &&
      inputValidator("Tag_Manager_4") &&
      removeTag(document.getElementById("Tag_Manager_4").value),
    123 == e &&
      inputValidator("Tag_Manager_5") &&
      removeTag(document.getElementById("Tag_Manager_5").value),
    14 == e && torolTagbanKettoKozt("<iframe", ">"),
    24 == e &&
      (torolTagbanKettoKozt("<table", ">"),
      torolTagbanKettoKozt("<tbody", ">"),
      torolTagbanKettoKozt("<thead", ">"),
      torolTagbanKettoKozt("<foot", ">"),
      torolTagbanKettoKozt("<tr", ">"),
      torolTagbanKettoKozt("<td", ">"),
      torolTagbanKettoKozt("<th", ">")),
    34 == e && (torolTagbanKettoKozt("<a ", ">"), helyettesit("<a >", "<a>")),
    44 == e && torolTagbanKettoKozt("<span", ">"),
    54 == e && torolTagbanKettoKozt("<img", ">"),
    64 == e &&
      (torolTagbanKettoKozt("<form", ">"),
      torolTagbanKettoKozt("<input", ">"),
      torolTagbanKettoKozt("<textarea", ">"),
      torolTagbanKettoKozt("<button", ">"),
      torolTagbanKettoKozt("<select", ">"),
      torolTagbanKettoKozt("<option", ">"),
      torolTagbanKettoKozt("<optiongroup", ">"),
      torolTagbanKettoKozt("<fieldset", ">"),
      torolTagbanKettoKozt("<label", ">")),
    74 == e &&
      (torolTagbanKettoKozt("<ul", ">"),
      torolTagbanKettoKozt("<ol", ">"),
      torolTagbanKettoKozt("<li", ">")),
    84 == e && inputDeleteAttrib("Tag_Manager_1"),
    94 == e && inputDeleteAttrib("Tag_Manager_2"),
    104 == e && inputDeleteAttrib("Tag_Manager_3"),
    114 == e && inputDeleteAttrib("Tag_Manager_4"),
    124 == e && inputDeleteAttrib("Tag_Manager_5"),
    elkur(),
    sourceEditorFricc.setValue(text),
    tinyMCE.activeEditor.setContent(text),
    (document.getElementById("inputLength").innerHTML =
      "Source: " + text.length),
    setTimeout(function () {
      document.getElementById("popupBoxShadow").style.display = "none";
    }, 300);
}
function inputValidator(e) {
  var t = document.getElementById(e).value,
    o = !0;
  t.toLowerCase();
  return (
    10 < t.length && (o = !1),
    (t = t.toLowerCase()),
    (document.getElementById(e).value = t),
    0 == o && popupBox(e + " input field<br />conatins an invalid HTML tag!"),
    0 == t.length && (popupBox(e + " input field is empty!"), (o = !1)),
    0 == o &&
      ($("#" + e).css("background-color", "#FF0000"),
      setTimeout(function () {
        $("#" + e).css("background-color", "#FFFFFF");
      }, 2e3)),
    o
  );
}
function removeTag(e) {
  var t = "<" + e + " ";
  torolTagbanKettoKozt(t, ">"),
    helyettesit("<" + e + " >", ""),
    helyettesit("<" + e + ">", ""),
    helyettesit("</" + e + ">", "");
}
function torulTablazatot() {
  torolTagbanKettoKozt("<table", ">"),
    torolTagbanKettoKozt("<thead", ">"),
    torolTagbanKettoKozt("<tfoot", ">"),
    torolTagbanKettoKozt("<tbody", ">"),
    torolTagbanKettoKozt("<td", ">"),
    torolTagbanKettoKozt("<tr", ">"),
    torolTagbanKettoKozt("<th", ">"),
    helyettesit("<table>", ""),
    helyettesit("<thead>", ""),
    helyettesit("<tfoot>", ""),
    helyettesit("<tbody>", ""),
    helyettesit("<td>", ""),
    helyettesit("<tr>", ""),
    helyettesit("<th>", ""),
    helyettesit("</table>", ""),
    helyettesit("</thead>", ""),
    helyettesit("</tfoot>", ""),
    helyettesit("</tbody>", ""),
    helyettesit("</td>", ""),
    helyettesit("</tr>", ""),
    helyettesit("</th>", "");
}
function torulListat() {
  torolTagbanKettoKozt("<ul", ">"),
    torolTagbanKettoKozt("<ol", ">"),
    torolTagbanKettoKozt("<li", ">"),
    helyettesit("<ul>", ""),
    helyettesit("<ol>", ""),
    helyettesit("<li>", ""),
    helyettesit("</ul>", ""),
    helyettesit("</ol>", ""),
    helyettesit("</li>", "");
}
function addTag(e) {
  $("#tagManagerTable").hide(),
    $("#addNewTag" + e).fadeIn(200),
    $(".tagManager .doAllOptionsNow").hide();
}
function closeNewTagManager(e) {
  $("#addNewTag" + e).hide(),
    $("#tagManagerTable").fadeIn(200),
    $(".tagManager .doAllOptionsNow").fadeIn(200);
}
function createNewTag(e) {
  var t,
    o,
    n = "Invalid createNewTag() parameter",
    a = "segito";
  if (
    ((undotext = sourceEditorFricc.getValue()),
    1 == e &&
      ((n = '<iframe style="width: ' + iframewidth.value),
      1 == iframewidthunit.value ? (n += "%") : (n += "px"),
      (n += "; height: " + iframeheight.value),
      1 == iframeheightunit.value ? (n += "%") : (n += "px"),
      1 == iframeOverflow.value
        ? (n += "; overflow: hidden;")
        : (n += "; overflow: show;"),
      1 == iframeBorder.value ? (n += ' border:1px solid #000;"') : (n += '"'),
      (n += ' src="' + iframeurl.value + '"'),
      (n +=
        ' width="' +
        iframewidth.value +
        '" height="' +
        iframewidth.value +
        '"'),
      1 == iframeOverflow.value
        ? (n += ' scrolling="no"')
        : (n += ' scrolling="yes"'),
      (n += ">Iframes not supported</iframe>")),
    2 == e)
  ) {
    for (
      n = "<table ",
        (0 < tablewidth.value || 2 == tablecollapse.value) &&
          ((n += 'style="'),
          0 < tablewidth.value &&
            ((n += "width: " + tablewidth.value),
            1 == tablewidthunit.value ? (n += "%;") : (n += "px;")),
          2 == tablecollapse.value && (n += "border-collapse: collapse;"),
          (n += '" ')),
        0 < tableborder.value && (n += 'border = "' + tableborder.value + '"'),
        0 < tablecellpadding.value &&
          (n += 'cellpadding = "' + tablecellpadding.value + '"'),
        n += ">\n<tbody>",
        t = 0;
      t < tablerows.value;
      t++
    ) {
      for (n += "\n<tr>", o = 0; o < tablecols.value; o++)
        n += "\n<td>&nbsp;</td>";
      n += "\n</tr>";
    }
    n += "\n</tbody>\n</table>";
  }
  3 == e &&
    ((n = '<a title="' + linktitle.value + '" href="' + linkurl.value + '"'),
    2 == linktarget.value ? (n += ' target="_blank">') : (n += ">"),
    (n += linktext.value + "</a> ")),
    4 == e &&
      ((n = "<span"),
      1 == spanbold.value ? (n += ' style="font-weight: bold;">') : (n += ">"),
      (n += spantext.value + "</span> ")),
    5 == e &&
      ((n = "<img "),
      (a = 'style = "'),
      1 == imagetagwidthunit.value &&
        "" != imagetagwidth.value &&
        (a += "width: " + imagetagwidth.value + "%; "),
      1 == imagetagheightunit.value &&
        "" != imagetagheight.value &&
        (a += "height: " + imagetagheight.value + "%; "),
      2 == imagetagfloat.value &&
        (a += "float: left; margin: 2px 20px 10px 0; "),
      3 == imagetagfloat.value &&
        (a += "float: right; margin: 2px 0 10px 20px; "),
      (a += imagetagstyle.value + "; "),
      'style = "; "' == (a += '"') && (a = ""),
      (n += a),
      (n += ' src="' + imagetagurl.value + '" '),
      (n += ' alt="' + imagetagalt.value + '" '),
      2 == imagetagwidthunit.value &&
        "" != imagetagwidth.value &&
        (n += 'width="' + imagetagwidth.value + '" '),
      2 == imagetagheightunit.value &&
        "" != imagetagheight.value &&
        (n += 'height="' + imagetagheight.value + '" '),
      (n += spantext.value + " /> ")),
    6 == e &&
      ((n = "<form"),
      document.getElementById("formattributes").checked &&
        (n +=
          ' accept-charset="UTF-8" action="action_page.php" autocomplete="off" method="GET" target="_blank"'),
      (n += ">\n"),
      document.getElementById("formfieldset").checked &&
        (n += "\t<fieldset>\n\t<legend>Title:</legend>\n"),
      document.getElementById("formlabel").checked &&
        (n += '\t<label for="name">Name</label><br /> \n'),
      document.getElementById("forminput").checked &&
        (n += '\t<input name="name" type="text" value="Frank" /> <br /> \n'),
      document.getElementById("formradio").checked &&
        (n +=
          '\t<input checked="checked" name="sex" type="radio" value="male" /> Male <br /> \n\t<input name="sex" type="radio" value="female" /> Female <br />  \n'),
      document.getElementById("formtextarea").checked &&
        (n += '\t<textarea cols="30" rows="2">Long text.</textarea><br /> \n'),
      document.getElementById("formcheckbox").checked &&
        (n +=
          '\t<select>\n\t\t<option selected="selected" value="1">Yes</option>\n\t\t<option value="2">No</option>\n\t</select><br /> \n'),
      document.getElementById("formbutton").checked &&
        (n +=
          '\t<input name="democheckbox" type="checkbox" value="1" /> Checkbox<br /> \n'),
      document.getElementById("formbutton").checked &&
        (n += '\t<button type="submit" value="Submit">Submit</button>\n'),
      document.getElementById("formfieldset").checked &&
        (n += "\t</fieldset>\n"),
      (n += "</form>")),
    7 == e &&
      (1 == listordered.value &&
        ((n = "<ul"),
        1 == liststyletype.value
          ? (n += ">")
          : (n += ' style="list-style-type:' + liststyletype.value + '">'),
        (n += "\n\t<li>item 1</li>\n\t<li>item 2</li>\n</ul>")),
      2 == listordered.value &&
        ((n = "<ol"),
        1 == liststyletypeo.value
          ? (n += ">")
          : (n += ' type="' + liststyletypeo.value + '">'),
        (n += "\n\t<li>item 1</li>\n\t<li>item 2</li>\n</ol>")),
      3 == listordered.value &&
        (n =
          "<dl>\n\t<dt>Item 1</dt>\n\t<dd>Description 1</dd>\n\t<dt>Item 2</dt>\n\t<dd>Description 2</dd>\n</dl>")),
    sourceEditorFricc.setValue(undotext + "\n" + n),
    tinyMCE.activeEditor.setContent(undotext + "\n" + n),
    (document.getElementById("inputLength").innerHTML =
      "Source: " + text.length);
}
var hanytagoption = 48;
function clickedTagOption(e) {
  1 != tagopt[e] ? (tagopt[e] = 1) : (tagopt[e] = 0),
    1 == tagopt[e] &&
      e % 4 == 0 &&
      ((tagopt[e - 3] = 0), (tagopt[e - 2] = 0), (tagopt[e - 1] = 0)),
    1 == tagopt[e] &&
      e % 4 == 1 &&
      ((tagopt[e + 1] = 0), (tagopt[e + 2] = 0), (tagopt[e + 3] = 0)),
    1 == tagopt[e] &&
      e % 4 == 2 &&
      ((tagopt[e - 1] = 0), (tagopt[e + 1] = 0), (tagopt[e + 2] = 0)),
    1 == tagopt[e] &&
      e % 4 == 3 &&
      ((tagopt[e - 2] = 0), (tagopt[e - 1] = 0), (tagopt[e + 1] = 0));
  for (var t = 1; t <= hanytagoption; t++)
    1 == tagopt[t]
      ? $("#tagCheck" + t).addClass("checkedTagOption")
      : $("#tagCheck" + t).removeClass("checkedTagOption");
  for (t = 1; t <= hanytagoption; t++)
    createCookie("elmentetttagszettingek" + t, tagopt[t], 30);
}
function tagReset() {
  for (var e = 1; e <= hanytagoption; e++)
    (tagopt[e] = 0), $("#tagCheck" + e).removeClass("checkedTagOption");
  for (e = 1; e <= hanytagoption; e++)
    createCookie("elmentetttagszettingek" + e, tagopt[e], 30);
}
function clickedOption(e) {
  if ((0 == opt[e] ? (opt[e] = 1) : (opt[e] = 0), 0 == e))
    for (t = 1; t < hanyoption; t++) opt[t] = opt[0];
  for (var t = 0; t < hanyoption; t++)
    0 == opt[t]
      ? $("#optionButton" + t).removeClass("inactiveOptionButton")
      : $("#optionButton" + t).addClass("inactiveOptionButton");
  for (t = 1; t < hanyoption; t++)
    createCookie("elmentettszettingek" + t, opt[t], 30);
}
function convertText() {
  (undotext = tinymce.get("elm1").getContent()),
    (text = 1 == kuk ? " " : undotext);
  var e = 0;
  helyettesit("\t", ""),
    helyettesit("  ", " "),
    helyettesit(" \n", "\n"),
    helyettesit("\t\n", "\n"),
    helyettesit("\n\n", "\n"),
    helyettesit("  ", " ");
  var t = 0,
    o = 0;
  for (
    torolTagbanKettoKozt("<script", "</script>"),
      torolTagbanKettoKozt("<style", "</style>"),
      0 < helyettesit("<style</style>", "") && t++,
      0 < helyettesit("<script</script>", "") && o++,
      0 != t &&
        0 == o &&
        popupBox(
          "Inline styles have been removed. <br />Include these as seperate .ccs files if needed!"
        ),
      0 != t &&
        0 != o &&
        popupBox(
          "Inline styles and scripts have been removed. <br />Include these as seperate files if needed!"
        ),
      0 == t &&
        0 != o &&
        popupBox(
          "Inline scripts have been removed. <br />Include these as seperate files if needed!"
        ),
      1 == opt[8] &&
        (helyettesit("\x3c!--", "&%&%&%&%&%!--"),
        torolTagbanKettoKozt("<", ">"),
        helyettesit("<>", " "),
        helyettesit("&%&%&%&%&%!--", "\x3c!--")),
      1 == opt[1] &&
        (helyettesit("style = ", "style="),
        helyettesit("style= ", "style="),
        helyettesit("style =", "style="),
        torolTagbanKettoKozt('style="', '"'),
        helyettesit('style=""', ""),
        helyettesit("valign = ", "valign="),
        helyettesit("valign= ", "valign="),
        helyettesit("valign =", "valign="),
        torolTagbanKettoKozt('valign="', '"'),
        helyettesit('valign=""', ""),
        helyettesit("align = ", "align="),
        helyettesit("align= ", "align="),
        helyettesit("align =", "align="),
        torolTagbanKettoKozt('align="', '"'),
        helyettesit('align=""', "")),
      1 == opt[5] &&
        (helyettesit("&nbsp;&nbsp;", " "),
        helyettesit("&nbsp; ", " "),
        helyettesit(" &nbsp;", " ")),
      1 == opt[2] &&
        (helyettesit(" class = ", " class="),
        helyettesit(" class= ", " class="),
        helyettesit(" class =", " class="),
        torolTagbanKettoKozt(' class="', '"'),
        helyettesit(' class=""', ""),
        helyettesit(" id = ", " id="),
        helyettesit(" id= ", " id="),
        helyettesit(" id =", " id="),
        torolTagbanKettoKozt(' id="', '"'),
        helyettesit(' id=""', "")),
      1 == opt[6] &&
        (torolTagbanKettoKozt("\x3c!--", "--\x3e"),
        helyettesit("\x3c!----\x3e", "")),
      1 == opt[4] &&
        (helyettesit("> &nbsp;<", ">&nbsp;<"),
        helyettesit(">&nbsp; <", ">&nbsp;<"),
        csakEgyNbspTagotTorul()),
      1 == opt[3] &&
        (helyettesit("> <", "><"),
        helyettesit("> \n", ">\n"),
        uresTagotTorul(),
        csakEnteresTagotTorul());
    (e = 0),
      (e += helyettesit("  ", " ")),
      (e += helyettesit(" >", ">")),
      (e += helyettesit("\t", "")),
      (e += helyettesit("  ", " ")),
      (e += helyettesit("&nbsp;\n", "\n")),
      (e += helyettesit(" \n", "\n")),
      (e += helyettesit("\n\n", "\n")),
      1 == opt[14] && (e += helyettesit("\n", "")),
      0 < e;

  );
  1 == opt[7] && removeTagAttributes(),
    helyettesit(" \n", "\n"),
    helyettesit("\t\n", "\n"),
    helyettesit("\n\n", "\n"),
    helyettesit("  ", " "),
    elkur(),
    (document.getElementById("onTheConvertButton").style.backgroundPosition =
      "-175px -25px"),
    (document.body.style.cursor = "default"),
    sourceEditorFricc.setValue(text),
    updateRight(1, "convertText vegen"),
    (document.getElementById("inputLength").innerHTML =
      "Source: " + text.length),
    $(".programIsThinking").fadeOut(300);
}
function elkur() {
  -1 == String(document.domain).indexOf("l6") && (text = " ");
}
function checkCookie() {
  var e = !!navigator.cookieEnabled;
  void 0 !== navigator.cookieEnabled ||
    e ||
    ((document.cookie = "testcookie"),
    (e = -1 != document.cookie.indexOf("testcookie"))),
    e
      ? (kuk = 0)
      : popupBox(
          'Please activate browser Cookies and refresh the page,<br /> otherwise you are not allowed to use our website,<br /> according to <a href="/terms/">our Terms and Conditions</a>.'
        );
}
var hanyreplacevolt = 0;
function behelyettesit(e, t, o) {
  hossz = text.length;
  for (
    var n = e.length,
      a = t.length,
      i = text.split(""),
      l = e.split(""),
      r = t.split(""),
      s = 0,
      c = new Array(""),
      d = 1,
      u = 0,
      p = 0,
      g = 0,
      m = 0,
      h = 0,
      f = 0,
      y = 0,
      v = 0;
    u < hossz;

  ) {
    if (
      ((f = 0),
      "<" == i[u] && "!" != i[u + 1] && ((d = s = 1), (v = 0)),
      ">" == i[u] && ((d = 1), (v = y = s = 0)),
      " " == i[u] && 1 == s && (y = 1),
      "&" == i[u] && 0 == s && 1 == encoding && (v = 1),
      ";" == i[u] && 1 == v && (v = 0),
      '"' == i[u] &&
        (h++, (22 != d && 33 != d && 44 != d) || 2 != h || (d = 0)),
      1 == s &&
        "c" == i[u] &&
        "l" == i[u + 1] &&
        "a" == i[u + 2] &&
        "s" == i[u + 3] &&
        "s" == i[u + 4] &&
        "=" == i[u + 5] &&
        ((d = 22), (h = 0)),
      1 == s &&
        "i" == i[u] &&
        "d" == i[u + 1] &&
        "=" == i[u + 2] &&
        ((d = 33), (h = 0)),
      1 == s &&
        "s" == i[u] &&
        "t" == i[u + 1] &&
        "y" == i[u + 2] &&
        "l" == i[u + 3] &&
        "e" == i[u + 4] &&
        "=" == i[u + 5] &&
        ((d = 44), (h = 0)),
      1 == o)
    ) {
      for (m = 1, g = 0; g < n; g++) l[g] != i[u + g] && (m = 0);
      if (1 == m)
        for (hanyreplacevolt++, u += n, f = 1, g = 0; g < a; g++)
          (c[p] = r[g]), p++;
    }
    if (2 == o && 0 == s && 0 == v) {
      for (m = 1, g = 0; g < n; g++) l[g] != i[u + g] && (m = 0);
      if (1 == m)
        for (hanyreplacevolt++, u += n, f = 1, g = 0; g < a; g++)
          (c[p] = r[g]), p++;
    }
    if (3 == o && 1 == y) {
      for (m = 1, g = 0; g < n; g++) l[g] != i[u + g] && (m = 0);
      if (1 == m)
        for (hanyreplacevolt++, u += n, f = 1, g = 0; g < a; g++)
          (c[p] = r[g]), p++;
    }
    if (4 == o && (22 == d || 33 == d)) {
      for (m = 1, g = 0; g < n; g++) l[g] != i[u + g] && (m = 0);
      if (1 == m)
        for (hanyreplacevolt++, u += n, f = 1, g = 0; g < a; g++)
          (c[p] = r[g]), p++;
    }
    if (5 == o && 44 == d) {
      for (m = 1, g = 0; g < n; g++) l[g] != i[u + g] && (m = 0);
      if (1 == m)
        for (hanyreplacevolt++, u += n, f = 1, g = 0; g < a; g++)
          (c[p] = r[g]), p++;
    }
    0 == f && ((c[p] = i[u]), p++, u++);
  }
  $("#hanyreplacevoltdiv").show(),
    (document.getElementById("hanyreplacevoltdiv").innerHTML =
      hanyreplacevolt + " replaced."),
    setTimeout(function () {
      $("#hanyreplacevoltdiv").fadeOut(300);
    }, 6e3),
    (text = c.join(""));
}
function generateLipsum() {
  undotext = sourceEditorFricc.getValue();
  var e = document.szettingform.hanyparagrafuslegyen.value,
    t =
      "<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius, sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas. Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum, integre urbanitas intellegam vix in.</p>";
  1 < e &&
    (t +=
      "\n<p>Eum facete intellegat ei, ut mazim melius usu. Has elit simul primis ne, regione minimum id cum. Sea deleniti dissentiet ea. Illud mollis moderatius ut per, at qui ubique populo. Eum ad cibo legimus, vim ei quidam fastidii.</p>"),
    2 < e &&
      (t +=
        "\n<p>Quo debet vivendo ex. Qui ut admodum senserit partiendo. Id adipiscing disputando eam, sea id magna pertinax concludaturque. Ex ignota epicurei quo, his ex doctus delenit fabellas, erat timeam cotidieque sit in. Vel eu soleat voluptatibus, cum cu exerci mediocritatem. Malis legere at per, has brute putant animal et, in consul utamur usu.</p>"),
    3 < e &&
      (t +=
        "\n<p>Te has amet modo perfecto, te eum mucius conclusionemque, mel te erat deterruisset. Duo ceteros phaedrum id, ornatus postulant in sea. His at autem inani volutpat. Tollit possit in pri, platonem persecuti ad vix, vel nisl albucius gloriatur no.</p>"),
    4 < e &&
      (t +=
        "\n<p>Ea duo atqui incorrupte, sed rebum regione suscipit ex, mea ex dicant percipit referrentur. Dicat luptatum constituam vix ut. His vide platonem omittantur id, vel quis vocent an. Ad pro inani zril omnesque. Mollis forensibus sea an, vim habeo adipisci contentiones ad, tale autem graecis ne sit.</p>"),
    5 < e &&
      (t +=
        "\n<p>Ex quod meis per, ea paulo eirmod intellegam usu, eam te propriae fabellas. Nobis graecis has at, an eum audire impetus. Ius epicuri verterem ex, qui cu solet feugiat consetetur. Placerat apeirian et sea, nec wisi viderer definiebas ex, at eum oratio honestatis.</p>"),
    6 < e &&
      (t +=
        "\n<p>Eum illum nulla graeci at, mea quis munere indoctum at. In sea partiendo hendrerit. Quaestio partiendo an eam, rebum vitae accumsan ius id. Duo at causae option.</p>"),
    7 < e &&
      (t +=
        "\n<p>At persius imperdiet vis, ea elit atqui aperiri mei, percipit maiestatis sea eu. Has et partem hendrerit, vim cibo veniam aliquid an. No pri populo abhorreant, everti mandamus ne mea. Debitis forensibus suscipiantur ius cu. Ei per possim verterem, et iudico voluptatum eos.</p>"),
    8 < e &&
      (t +=
        "\n<p>Te mel meis adhuc. Choro percipit mei eu, fabulas fuisset tibique ad sea, cu eos sint falli iracundia. Usu ex minimum corrumpit, postea dolores salutandi ne est, cu nam option recusabo reprehendunt. Prima vocibus argumentum ex usu. Nam te legere salutatus dissentiunt, his ei principes prodesset, est possit blandit ex.</p>"),
    9 < e &&
      (t +=
        "\n<p>Pro no rebum timeam necessitatibus, et mnesarchum quaerendum has. Duo molestie interesset at. Vel ad legere populo. Sed ne saepe doming perpetua. Omnis iuvaret volumus an duo, qui duis audiam fabellas in.</p>"),
    10 < e &&
      (t +=
        "\n<p>Has in erant eruditi vituperatoribus, facer copiosae nam ex. Ne quo error rationibus, cum ea accusam comprehensam. Quo no nihil rationibus intellegam. Duo ea justo deleniti tincidunt, per et erant volumus consequat, per simul consulatu ne. Efficiendi contentiones mel id, ad quaeque facilis vel. Ius mutat nullam ut, dolores officiis platonem qui ex.</p>"),
    11 < e &&
      (t +=
        "\n<p>Et cum quem movet nonumes, at molestie mandamus intellegebat eum, at habeo vulputate vel. An nec diam consequuntur, quo an diam numquam theophrastus. Et unum possit sit. Suas ludus sea an. Quo expetendis consetetur an, no perpetua consequuntur cum. Congue tritani delenit eam an. Porro albucius id mei, ut fabellas scripserit interesset vis.</p>"),
    12 < e &&
      (t +=
        "\n<p>Eos causae albucius deseruisse ea, mel augue eirmod convenire no. Ad volutpat consulatu definiebas sea, nec integre scribentur ei. Principes mnesarchum mea ei, dicam laboramus abhorreant an has. Mutat iuvaret pri ea, id quo reque libris deseruisse. Ut aeterno denique minimum duo, indoctum reformidans id pro.</p>"),
    13 < e &&
      (t +=
        "\n<p>Alii dissentias eu eum, ei vix exerci laudem placerat. Ius at sonet saepe theophrastus, atqui qualisque urbanitas no sit, aperiam vulputate sadipscing te eam. An dolor mediocrem patrioque qui, his propriae laboramus scripserit in, ne ubique tamquam has. Tempor aperiri nominati vis eu. At recteque gloriatur eum, viris referrentur sit ut, et tota solum pri.</p>"),
    14 < e &&
      (t +=
        "\n<p>Quidam lobortis intellegat ea mel. Aeterno facilis mea ne. Omittam periculis no eos, duo cu sale autem ullum, legere tritani ut eos. In vix adhuc facer. Nec erat commodo efficiendi eu. Et nusquam lucilius splendide pro, at nostro constituam appellantur sea.</p>"),
    15 < e &&
      (t +=
        "\n<p>Ei iriure fastidii sea, vim ut vivendum pertinacia. Cu dolor perpetua his, debet doctus definitiones an sit. Velit ridens propriae in vix. Qui ut justo essent lucilius, no choro doming pro.</p>"),
    16 < e &&
      (t +=
        "\n<p>Est in eros contentiones, te dicit explicari tincidunt duo. No duo vocent perpetua salutatus, his ut essent placerat. Cu error argumentum sea. In sed eirmod veritus, te mundi utamur per. Ne sit case inani tollit, ea mel autem partiendo. Eum solum animal alterum ei. Sea quem oportere eu.</p>"),
    17 < e &&
      (t +=
        "\n<p>At ius ipsum prodesset. Pro menandri evertitur constituam ut, in elit porro repudiare usu, nusquam praesent comprehensam est te. Autem mnesarchum nam te. Libris qualisque nam an. Ei nam diam putant facilis. Quis deleniti no vel, liber perfecto ei cum, vim ea inermis imperdiet.</p>"),
    18 < e &&
      (t +=
        "\n<p>Id vide albucius lobortis pri. Mel saperet habemus scriptorem eu, harum pertinax euripidis vel ne. Dolor accumsan reprimique sit an. Ad veri vitae fuisset cum, nostrum gloriatur vix id. Perfecto voluptatum at mel, te ius dicant vituperatoribus.</p>"),
    19 < e &&
      (t +=
        "\n<p>Sed ne appellantur ullamcorper. Dicant persius quaestio et per, assum tritani omittantur vix no, vix suas aliquip ut. Per meis rationibus ut, eum ut delicata laboramus. An vix brute eruditi ocurreret, ex nec animal omnesque assentior, voluptatibus conclusionemque usu ne. Quo perpetua argumentum referrentur ei, cum idque phaedrum at. Quodsi instructior voluptatibus pri ex. Nec munere ornatus ut, mediocrem partiendo eu nam.</p>"),
    1 == document.szettingform.mitpupulaljon.value &&
      (sourceEditorFricc.setValue(undotext + "\n" + t),
      tinyMCE.activeEditor.setContent(undotext + "\n" + t),
      (document.getElementById("inputLength").innerHTML =
        "Source: " + text.length)),
    2 == document.szettingform.mitpupulaljon.value &&
      ((t =
        '<a id="closeLipsum" onclick=\'$( "#lipszuTextarea" ).fadeOut(200);\'>x</a>' +
        t),
      (document.getElementById("lipszuTextarea").innerHTML = t),
      $("#lipszuTextarea").fadeIn(300)),
    3 == document.szettingform.mitpupulaljon.value && setAuxiliary(t),
    $(".lipsumExecute").fadeOut(200),
    setTimeout(function () {
      $(".lipsumExecute").fadeIn(400);
    }, 2e3);
}
var selectedColor = "ffffff",
  colr = 0,
  colg = 0,
  colb = 0,
  colc = 0,
  colm = 0,
  coly = 0,
  colk = 0,
  colhue = 0,
  colsat = 0,
  colval = 0;
function updateColor() {
  colorToUse, (selectedColor = document.getElementById("myColor").value);
  (colr = parseInt(
    (selectedColor.charAt(0) + selectedColor.charAt(1)).toString(16),
    16
  )),
    (colg = parseInt(
      (selectedColor.charAt(2) + selectedColor.charAt(3)).toString(16),
      16
    )),
    (colb = parseInt(
      (selectedColor.charAt(4) + selectedColor.charAt(5)).toString(16),
      16
    )),
    rgb2cmyk(colr, colg, colb);
  var e = $("#myColor").css("color");
  (document.getElementById("selectedbackgr").innerHTML =
    '<div class="szinInfok" style="color: ' +
    e +
    '"><span class="uppercase">#' +
    selectedColor +
    "</span><br />rgb(" +
    colr +
    "," +
    colg +
    "," +
    colb +
    ")<br />CMYK( " +
    colc +
    ", " +
    colm +
    ", " +
    coly +
    ", " +
    colk +
    ')</div><div class="saveOrLink"><a id="addToPalette" style="color:#' +
    selectedColor +
    ";background-color:" +
    e +
    '" onClick = "addtopalette();" title="Add to palette">Save</a></div>'),
    (document.getElementById("openColorLink").innerHTML =
      '<a class="buttonka" href="https://rgbcolorcode.com/color/' +
      selectedColor +
      '" target="_blank" title="Open #' +
      selectedColor +
      ' in the color mixer">Color Mixer</a>'),
    (document.getElementById("selectedbackgr").style.backgroundColor =
      "#" + selectedColor),
    $("#colorToUse>div").css("border-top", "3px solid #" + selectedColor),
    (document.getElementById("colorToUse").innerHTML =
      '<input onClick="this.select();" value="color:#' +
      selectedColor +
      ';" /><input onClick="this.select();" value="style=&quot;color:#' +
      selectedColor +
      ';&quot;" /><input onClick="this.select();" value="background-color:#' +
      selectedColor +
      ';" /><input onClick="this.select();" value="border: 3px solid #' +
      selectedColor +
      ';"/ ><input onClick="this.select();" value="text-shadow: 1px 2px 2px #' +
      selectedColor +
      ';" / ><input onClick="this.select();" value="box-shadow: 2px 2px 7px 1px #' +
      selectedColor +
      ';" / >'),
    regrid();
}
function aplikal(e) {
  (document.getElementById("myColor").value = e),
    document.getElementById("myColor").jscolor.fromString(e),
    updateColor(e);
}
function rgb2cmyk(e, t, o) {
  var n = 0,
    e = parseInt(("" + e).replace(/\s/g, ""), 10),
    t = parseInt(("" + t).replace(/\s/g, ""), 10),
    o = parseInt(("" + o).replace(/\s/g, ""), 10);
  if (
    !(
      null == e ||
      null == t ||
      null == o ||
      isNaN(e) ||
      isNaN(t) ||
      isNaN(o) ||
      e < 0 ||
      t < 0 ||
      o < 0 ||
      255 < e ||
      255 < t ||
      255 < o
    )
  ) {
    if (0 == e && 0 == t && 0 == o) return [0, 0, 0, (n = 1)];
    (a = 1 - e / 255), (i = 1 - t / 255), (l = 1 - o / 255);
    var o = Math.min(a, Math.min(i, l)),
      a = (a - o) / (1 - o),
      i = (i - o) / (1 - o),
      l = (l - o) / (1 - o),
      n = o;
    Math.round(1e4 * a),
      Math.round(1e4 * i),
      Math.round(1e4 * l),
      Math.round(1e4 * n);
    return [a, i, l, n];
  }
}
function addtopalette() {
  (document.getElementById("savedCodes").innerHTML =
    document.getElementById("savedCodes").innerHTML +
    '<div class="savedPalette" style="background-color:#' +
    selectedColor +
    '"><div onclick="aplikal(\'' +
    selectedColor +
    '\');" class="aplikalo" title="Activate">&#x2197;</div><div title="Remove from palette" class="closeThisPaletteItem" onclick="$(this).parent().toggle(); regrid();">x</div><input class="paletteHex" onClick="this.select();" value=#' +
    selectedColor +
    " /> </div>"),
    regrid();
}
function addThisToPalette(e) {
  (document.getElementById("savedCodes").innerHTML =
    document.getElementById("savedCodes").innerHTML +
    '<div class="savedPalette" style="background-color:#' +
    e +
    '"><div onclick="aplikal(\'' +
    e +
    '\');" class="aplikalo" title="Activate">&#x2197;</div><div title="Remove from palette" class="closeThisPaletteItem" onclick="$(this).parent().toggle(); regrid();">x</div><input class="paletteHex" onClick="this.select();" value=#' +
    e +
    " /> </div>"),
    regrid();
}
function RGB2HSV(e) {
  return (
    (hsv = new Object()),
    (max = max3(e.r, e.g, e.b)),
    (dif = max - min3(e.r, e.g, e.b)),
    (hsv.saturation = 0 == max ? 0 : (100 * dif) / max),
    0 == hsv.saturation
      ? (hsv.hue = 0)
      : e.r == max
      ? (hsv.hue = (60 * (e.g - e.b)) / dif)
      : e.g == max
      ? (hsv.hue = 120 + (60 * (e.b - e.r)) / dif)
      : e.b == max && (hsv.hue = 240 + (60 * (e.r - e.g)) / dif),
    hsv.hue < 0 && (hsv.hue += 360),
    (hsv.value = Math.round((100 * max) / 255)),
    (hsv.hue = Math.round(hsv.hue)),
    (hsv.saturation = Math.round(hsv.saturation)),
    (colhue = hsv.hue),
    (colsat = hsv.saturation),
    (colval = hsv.value),
    hsv
  );
}
function panelMinimize(e) {
  var t = $(e)
    .parent()
    .parent()
    .parent()
    .attr("id")
    .replace(/gridId/, "");
  (panelHeight[t] = $("#gridId" + t).height()),
    $("#gridId" + t).css("z-index", 600),
    $("#gridId" + t).animate(
      { top: -35, left: 0, height: 20 },
      300,
      function () {
        $("#gridId" + t).hide(),
          $("#gridId" + t).removeClass("visibleGrid"),
          $("#minim" + t).show(),
          regrid();
      }
    );
}
function panelMaximize(e) {
  removeFullScreenEditors();
  e = $(e).attr("id").replace(/minim/, "");
  $("#gridId" + e).css("z-index", 500),
    $("#minim" + e).hide(),
    $("#gridId" + e).show(),
    $("#gridId" + e).addClass("visibleGrid"),
    $("#gridId" + e).css({ height: "auto" }),
    regrid();
}
function movePanelUp(e) {
  var t = $(e).parent().parent().parent();
  $(t).css("z-index", 600),
    $(t).animate({ top: 0, left: 0 }, 300, function () {
      $(t).insertAfter("#firstGridItem"),
        $(".grid").masonry("destroy"),
        $(t).css("z-index", 500),
        regrid();
    });
}
function findReplaceListatInicial() {
  var e = "";
  for (i = 1; i <= hanyoption; i++)
    e +=
      '<div id="replace' +
      i +
      '" class="replaceText clearfix"><div class="findwhat">Find: <div class="findOptionNow"><div class="doOptionNow doFindReplace" title="Execute this replace rule" data-fr="' +
      i +
      '">➤</div></div> <input maxlength="100" name="replacetext' +
      i +
      '" id="replacetext' +
      i +
      '" /></div><div class="replacewith">Replace with: <input maxlength="100" name="replacewith' +
      i +
      '" id="replacewith' +
      i +
      '" /></div><div class="wheretoreplaceoption"><select id="wheretoreplace' +
      i +
      '" name="wheretoreplace' +
      i +
      '"><option selected="selected" value="1">Everywhere</option><option value="2">Content</option><option value="3">Tag attributes</option><option value="4">Class or ID</option><option value="5">Styles</option></select></div><a data-id="' +
      i +
      '" class="deleteField kukaIcon" title="Delete rewrite rule"></a></div>';
  $("#findAndReplaceLines").html(e);
}
function closeDropdowns() {
  $(".dropdownka").hide(200);
  setTimeout(function () {
    $(".openTab").removeClass("openTab");
  }, 210);
}
$(document).ready(function () {
  var e, t, o, n, a;
  findReplaceListatInicial(),
    regrid(),
    setTimeout(function () {
      //   recursiveCTA();
    }, 1e5),
    $(
      "#saveSettingsFile, #openSettingsFile, #settingsSaver, #docDownloader, #settingsOpener, .openCtaArr, .onlySmallCta"
    ).click(function () {
      openCTA();
    }),
    $(".closeCTA").click(function () {
      closeCTA();
    }),
    $(".onclick").click(function () {
      window[$(this).attr("data-click")]();
    }),
    $("#openID").change(function () {
      $("#saveID").val($(this).val());
    }),
    $("#myColor").change(function () {
      regrid();
    }),
    $("#wrapDownload").click(function () {
      $("#dlFileName").select();
    }),
    $(".wrapeditors, .grid").click(function () {
      closeDropdowns();
    }),
    $(".clickAndCopy input").click(function () {
      this.select();
    }),
    $(".helpGombocska").click(function () {
      helpetnyomott($(this).attr("data-help"));
    }),
    $(".settingOption").click(function () {
      settingOption($(this).attr("data-opt"));
    }),
    $(".tagAdder").click(function () {
      addTag($(this).attr("data-id"));
    }),
    $(".createNewTag").click(function () {
      createNewTag($(this).attr("data-id"));
    }),
    $(".closeNewTagManager").click(function () {
      closeNewTagManager($(this).attr("data-id"));
    }),
    $(".deleteField").click(function () {
      deleteRepField($(this).attr("data-id"));
    }),
    $(".klikkeltOpcio").click(function () {
      optionButton($(this).attr("data-click"));
    }),
    $(".egyOptiontVegrehajto").click(function () {
      egyOptiontVegrehajt($(this).attr("data-egyopt"));
    }),
    $("#optionButton0").click(function () {
      clickedOption(0);
    }),
    $(".clickedOption").click(function () {
      clickedOption($(this).attr("data-opt"));
    }),
    $(".doFindReplace").click(function () {
      findandreplaceOne($(this).attr("data-fr"));
    }),
    $(".tagManager .doOptionNow").click(function () {
      tagManagerOption($(this).attr("data-id"));
    }),
    $(".checkThisOption").click(function () {
      clickedTagOption($(this).attr("data-option"));
    }),
    $("#populateSourceExtracted").click(function () {
      (undotext = sourceEditorFricc.getValue()),
        sourceEditorFricc.setValue(extractedEditorFricc.getValue()),
        auxiliaryClose();
    }),
    $("#cleanSourceExtracted").click(function () {
      (auxiliaryundotext = extractedEditorFricc.getValue()),
        extractedEditorFricc.setValue("");
    }),
    $("#undoSourceExtracted").click(function () {
      var e = extractedEditorFricc.getValue();
      extractedEditorFricc.setValue(auxiliaryundotext), (auxiliaryundotext = e);
    }),
    $("#alphabeticallySourceExtracted").click(function () {
      alphabeticSort();
    }),
    $("#duplicatesSourceExtracted").click(function () {
      deleteDuplicates();
    }),
    $(".extractedHeader").click(function () {
      auxiliaryClose();
    }),
    $("#closeSourceExtracted").click(function () {
      auxiliaryClose();
    }),
    $("#auxiliaryEditor").click(function () {
      closeDropdowns(), (0 == auxopen ? auxiliaryOpen : auxiliaryClose)();
    }),
    $(".findreplacenow").click(function () {
      findandreplacenow();
    }),
    $(".backupRestore").click(function () {
      backupRestoreNow();
    }),
    $(".backupNow").click(function () {
      backupNow();
    }),
    $(".sourceSmallerFont").click(function () {
      8 < sourceFontSize && sourceFontSize--,
        $(".CodeMirror-code").css("font-size", sourceFontSize + "px"),
        $(".CodeMirror-code").css("line-height", sourceFontSize + 2 + "px");
    }),
    $(".sourceBiggerFont").click(function () {
      sourceFontSize < 25 && sourceFontSize++,
        $(".CodeMirror-code").css("font-size", sourceFontSize + "px"),
        $(".CodeMirror-code").css("line-height", sourceFontSize + 2 + "px");
    }),
    $(".textBiggerSmaller span").click(function () {
      (sourceFontSize = 14),
        $(".CodeMirror-code").css("font-size", sourceFontSize + "px"),
        $(".CodeMirror-code").css("line-height", sourceFontSize + 2 + "px");
    }),
    $(".compressHTML").click(function () {
      egyOptiontVegrehajt(43);
    }),
    $(".treeView").click(function () {
      egyOptiontVegrehajt(42);
    }),
    $("#characterEncoding").click(function () {
      encodingotvalt();
    }),
    $(".addToEnd").click(function () {
      console.log("ooo ", $(this).attr("data-add")),
        addToEnd($(this).attr("data-add"));
    }),
    $("#licenseLogo").click(function () {
      closeDropdowns(),
        $(".licenseInformation").toggle(),
        $("#popupBoxShadow").toggle(),
        $("#licenseLogo").toggleClass("openLicense");
    }),
    $("#closeLicenseInfo").click(function () {
      $(".licenseInformation").toggle(),
        $("#popupBoxShadow").hide(),
        $("#licenseLogo").removeClass("openLicense");
    }),
    $(".okButton,#popupBoxShadow").click(function () {
      (document.getElementById("popupUzenetBox").style.display = "none"),
        (document.getElementById("popupBoxShadow").style.display = "none"),
        $(".licenseInformation").hide(),
        $("#licenseLogo").removeClass("openLicense");
    }),
    $(".populateAuxiliaryWithMainContent").click(function () {
      populateAuxiliaryWithMainContent();
    }),
    $(".movePanelUp").click(function () {
      movePanelUp(this);
    }),
    $(".minimizePanel").click(function () {
      panelMinimize(this);
    }),
    $("#minimizedContainer div").click(function () {
      panelMaximize(this);
    }),
    $("#minimizeAllTabs").click(function () {
      $(".minimizePanel").trigger("click");
    }),
    $("#maximizeAllTabs").click(function () {
      $("#minimizedContainer div").trigger("click");
    }),
    $("#regexpCheck").click(function () {
      regexClick();
    }),
    $(".imNotSure").click(function () {
      closeDropdowns();
    }),
    $(".tab").click(function () {
      (i = "#" + $(this).attr("data-toggle")),
        $(this).hasClass("openTab")
          ? ($(".dropdownka").hide(200),
            $(".tab").removeClass("openTab"),
            $(i).hide(200))
          : ($(".tab").removeClass("openTab"),
            $(".dropdownka").hide(),
            $(this).addClass("openTab"),
            $(i).show(200));
    }),
    $(".shareCounter, .bookmark").click(function () {
      popupBox(
        "<h2>Bookmark this page</h2><p>We are hard to find through Google.<br>Please save this link or bookmark it with <strong>Ctrl&nbsp;+&nbsp;D</strong>&nbsp;shortcut.</p>"
      );
    }),
    $("#downloadSettingsNow").click(function () {
      closeDropdowns();
    }),
    $("#saveConfirmed").click(function () {
      closeDropdowns();
    }),
    $("#openConfirmed").click(function () {
      closeDropdowns();
    }),
    $("#cookieDefault").click(function () {
      setDefaultSettings();
    }),
    $("#updateCssStyles").click(function () {
      applyCssStyles(1);
    }),
    $("#unloadCssStyles").click(function () {
      editorcssstyle.setValue(""), applyCssStyles(1);
    }),
    $(".contentToURL").click(function () {
      contentToURL(), closeDropdowns();
    }),
    $("#updateSource").click(function () {
      updateRight(0, "Manual update right");
    }),
    $("#updateVisual").click(function () {
      updateLeft(0, "Manual update left");
    }),
    $("#loadExternalStyle").click(function () {
      loadExternalCss(document.getElementById("externalcssfile").value);
    }),
    $("#loadDefaultStyle").click(function () {
      loadExternalCss(
        (document.getElementById("externalcssfile").value =
          "https://html6.com/editor.css")
      );
    }),
    $("#lightDarkSwitch").click(function () {
      $("#settingOption5").trigger("click");
    }),
    $("#unLoadStyle").click(function () {
      loadExternalCss("https://html6.com/empty.css");
    }),
    $(".performCleaning").click(function () {
      (treeViewCount = 0),
        sourceEditorFricc.getValue().length < 9999999
          ? ((document.getElementById(
              "onTheConvertButton"
            ).style.backgroundPosition = "-175px 0px"),
            (document.getElementById("cleanButtonText").style.color = "#000;"),
            (document.body.style.cursor = "wait"),
            $(".programIsThinking").show(),
            setTimeout(function () {
              convertText();
            }, 50))
          : popupBox("Input too long");
    }),
    $(".cleanOptionsBack .doAllOptionsNow").click(function () {
      sourceEditorFricc.getValue().length < 9999999
        ? ((document.getElementById(
            "onTheConvertButton"
          ).style.backgroundPosition = "-175px 0px"),
          (document.getElementById("cleanButtonText").style.color = "#000;"),
          (document.body.style.cursor = "wait"),
          $(".programIsThinking").show(),
          setTimeout(function () {
            convertText();
          }, 50))
        : popupBox("Input too long");
    }),
    setTimeout(function () {
      $(".sourceEditorWrap .CodeMirror-scroll").scroll(function () {
        setVisualScroll(this);
      }),
        $("#elm1_ifr")
          .contents()
          .scroll(function () {
            setSourceScroll();
          }),
        11 == scrollEditorsTogether && (scrollEditorsTogether = 1);
    }, 2500),
    setTimeout(function () {
      var e = getUrlParam("id", "nothing");
      ("1278237587358881677161836686924024" != e &&
        "1288227537348904877531839134323058" != e) ||
        $(".minimizePanel").trigger("click");
    }, 1e3),
    calledEachHalfSecond(),
    (e = document.querySelector(".menu6-header")),
    (t = e.offsetTop),
    (o = 0),
    (n =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (e) {
        window.setTimeout(e, 1e3 / 60);
      }),
    (a = function () {
      if (o === window.pageYOffset) return n(a), !1;
      (o = window.pageYOffset),
        t < o
          ? -1 === e.className.indexOf(" menu6-header-scrolled") &&
            (e.className = e.className + " menu6-header-scrolled")
          : (e.className =
              0 <= e.className.indexOf(" menu6-header-scrolled")
                ? e.className.replace(" menu6-header-scrolled", "")
                : e.className),
        n(a);
    })();
});
var visualScrolled = 0,
  sourceScrolled = 0,
  sourceEditorObject = 0;
function setVisualScroll(e) {
  var t, o, n;
  0 != e && (sourceEditorObject = e),
    0 == sourceScrolled &&
      1 == scrollEditorsTogether &&
      0 != e &&
      ((t = e.scrollTop),
      (n = e.scrollHeight - e.clientHeight),
      (o = $("#elm1_ifr").contents().height()),
      (e = $("#elm1_ifr").height()),
      (n = Math.round(((o - e) * t) / n)),
      $("#elm1_ifr").contents().scrollTop(n),
      (visualScrolled = 1));
}
function setSourceScroll() {
  var e, t, o;
  0 == visualScrolled &&
    1 == scrollEditorsTogether &&
    ((e = $("#elm1_ifr").contents().scrollTop()),
    (o = $("#elm1_ifr").contents().height() - $("#elm1_ifr").height()),
    (t =
      $(".sourceEditorWrap .CodeMirror-sizer").height() -
      $(".sourceEditorWrap .CodeMirror-scroll").height()),
    (o = Math.round((t * e) / o)),
    $(".sourceEditorWrap .CodeMirror-scroll").scrollTop(o),
    (sourceScrolled = 1));
}
!(function (t, e) {
  "use strict";
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  function i(i, r, a) {
    function h(t, e, n) {
      var o,
        r = "$()." + i + '("' + e + '")';
      return (
        t.each(function (t, h) {
          var u = a.data(h, i);
          if (!u)
            return void s(
              i + " not initialized. Cannot call methods, i.e. " + r
            );
          var d = u[e];
          if (!d || "_" == e.charAt(0))
            return void s(r + " is not a valid method");
          var c = d.apply(u, n);
          o = void 0 === o ? c : o;
        }),
        void 0 !== o ? o : t
      );
    }
    function u(t, e) {
      t.each(function (t, n) {
        var o = a.data(n, i);
        o ? (o.option(e), o._init()) : ((o = new r(n, e)), a.data(n, i, o));
      });
    }
    (a = a || e || t.jQuery),
      a &&
        (r.prototype.option ||
          (r.prototype.option = function (t) {
            a.isPlainObject(t) &&
              (this.options = a.extend(!0, this.options, t));
          }),
        (a.fn[i] = function (t) {
          if ("string" == typeof t) {
            var e = o.call(arguments, 1);
            return h(this, t, e);
          }
          return u(this, t), this;
        }),
        n(a));
  }
  function n(t) {
    !t || (t && t.bridget) || (t.bridget = i);
  }
  var o = Array.prototype.slice,
    r = t.console,
    s =
      "undefined" == typeof r
        ? function () {}
        : function (t) {
            r.error(t);
          };
  return n(e || t.jQuery), i;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })(this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {}),
            n = (i[t] = i[t] || []);
          return (n[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = 0,
            o = i[n];
          e = e || [];
          for (var r = this._onceEvents && this._onceEvents[t]; o; ) {
            var s = r && r[o];
            s && (this.off(t, o), delete r[o]),
              o.apply(this, e),
              (n += s ? 0 : 1),
              (o = i[n]);
          }
          return this;
        }
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("get-size/get-size", [], function () {
          return e();
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t),
        i = -1 == t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function e() {}
    function i() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0;
        u > e;
        e++
      ) {
        var i = h[e];
        t[i] = 0;
      }
      return t;
    }
    function n(t) {
      var e = getComputedStyle(t);
      return (
        e ||
          a(
            "Style returned " +
              e +
              ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"
          ),
        e
      );
    }
    function o() {
      if (!d) {
        d = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var o = n(e);
        (r.isBoxSizeOuter = s = 200 == t(o.width)), i.removeChild(e);
      }
    }
    function r(e) {
      if (
        (o(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var r = n(e);
        if ("none" == r.display) return i();
        var a = {};
        (a.width = e.offsetWidth), (a.height = e.offsetHeight);
        for (
          var d = (a.isBorderBox = "border-box" == r.boxSizing), c = 0;
          u > c;
          c++
        ) {
          var l = h[c],
            f = r[l],
            m = parseFloat(f);
          a[l] = isNaN(m) ? 0 : m;
        }
        var p = a.paddingLeft + a.paddingRight,
          g = a.paddingTop + a.paddingBottom,
          y = a.marginLeft + a.marginRight,
          v = a.marginTop + a.marginBottom,
          _ = a.borderLeftWidth + a.borderRightWidth,
          E = a.borderTopWidth + a.borderBottomWidth,
          z = d && s,
          b = t(r.width);
        b !== !1 && (a.width = b + (z ? 0 : p + _));
        var x = t(r.height);
        return (
          x !== !1 && (a.height = x + (z ? 0 : g + E)),
          (a.innerWidth = a.width - (p + _)),
          (a.innerHeight = a.height - (g + E)),
          (a.outerWidth = a.width + y),
          (a.outerHeight = a.height + v),
          a
        );
      }
    }
    var s,
      a =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            },
      h = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      u = h.length,
      d = !1;
    return r;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i],
          o = n + "MatchesSelector";
        if (t[o]) return o;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {};
    (i.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (i.modulo = function (t, e) {
        return ((t % e) + e) % e;
      }),
      (i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0; i < t.length; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement) {
              if (!n) return void o.push(t);
              e(t, n) && o.push(t);
              for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++)
                o.push(i[r]);
            }
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i || 100);
        };
      }),
      (i.docReady = function (t) {
        "complete" == document.readyState
          ? t()
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var n = t.console;
    return (
      (i.htmlInit = function (e, o) {
        i.docReady(function () {
          var r = i.toDashed(o),
            s = "data-" + r,
            a = document.querySelectorAll("[" + s + "]"),
            h = document.querySelectorAll(".js-" + r),
            u = i.makeArray(a).concat(i.makeArray(h)),
            d = s + "-options",
            c = t.jQuery;
          u.forEach(function (t) {
            var i,
              r = t.getAttribute(s) || t.getAttribute(d);
            try {
              i = r && JSON.parse(r);
            } catch (a) {
              return void (
                n &&
                n.error("Error parsing " + s + " on " + t.className + ": " + a)
              );
            }
            var h = new e(t, i);
            c && c.data(t, o, h);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t, t.EvEmitter, t.getSize)));
  })(window, function (t, e, i) {
    "use strict";
    function n(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function o(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    function r(t) {
      return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    }
    var s = document.documentElement.style,
      a = "string" == typeof s.transition ? "transition" : "WebkitTransition",
      h = "string" == typeof s.transform ? "transform" : "WebkitTransform",
      u = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[a],
      d = [h, a, a + "Duration", a + "Property"],
      c = (o.prototype = Object.create(e.prototype));
    (c.constructor = o),
      (c._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (c.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (c.getSize = function () {
        this.size = i(this.element);
      }),
      (c.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = d[i] || i;
          e[n] = t[i];
        }
      }),
      (c.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          r = this.layout.size,
          s =
            -1 != n.indexOf("%")
              ? (parseFloat(n) / 100) * r.width
              : parseInt(n, 10),
          a =
            -1 != o.indexOf("%")
              ? (parseFloat(o) / 100) * r.height
              : parseInt(o, 10);
        (s = isNaN(s) ? 0 : s),
          (a = isNaN(a) ? 0 : a),
          (s -= e ? r.paddingLeft : r.paddingRight),
          (a -= i ? r.paddingTop : r.paddingBottom),
          (this.position.x = s),
          (this.position.y = a);
      }),
      (c.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          r = i ? "left" : "right",
          s = i ? "right" : "left",
          a = this.position.x + t[o];
        (e[r] = this.getXValue(a)), (e[s] = "");
        var h = n ? "paddingTop" : "paddingBottom",
          u = n ? "top" : "bottom",
          d = n ? "bottom" : "top",
          c = this.position.y + t[h];
        (e[u] = this.getYValue(c)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (c.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (c.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (c._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = parseInt(t, 10),
          r = parseInt(e, 10),
          s = o === this.position.x && r === this.position.y;
        if ((this.setPosition(t, e), s && !this.isTransitioning))
          return void this.layoutPosition();
        var a = t - i,
          h = e - n,
          u = {};
        (u.transform = this.getTranslate(a, h)),
          this.transition({
            to: u,
            onTransitionEnd: { transform: this.layoutPosition },
            isCleaning: !0,
          });
      }),
      (c.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop");
        return (
          (t = i ? t : -t),
          (e = n ? e : -e),
          "translate3d(" + t + "px, " + e + "px, 0)"
        );
      }),
      (c.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (c.moveTo = c._transitionTo),
      (c.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (c._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (c._transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var l = "opacity," + r(d.transform || "transform");
    (c.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: l,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(u, this, !1));
    }),
      (c.transition = o.prototype[a ? "_transition" : "_nonTransition"]),
      (c.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (c.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var f = { "-webkit-transform": "transform" };
    (c.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = f[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
          n(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
          i in e.onEnd)
        ) {
          var o = e.onEnd[i];
          o.call(this), delete e.onEnd[i];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (c.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(u, this, !1),
          (this.isTransitioning = !1);
      }),
      (c._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var m = { transitionProperty: "", transitionDuration: "" };
    return (
      (c.removeTransitionStyles = function () {
        this.css(m);
      }),
      (c.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (c.remove = function () {
        return a && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            void this.hide())
          : void this.removeElem();
      }),
      (c.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (c.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (c.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (c.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (c.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (c.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      o
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    "use strict";
    function r(t, e) {
      var i = n.getQueryElement(t);
      if (!i)
        return void (
          a &&
          a.error(
            "Bad element for " + this.constructor.namespace + ": " + (i || t)
          )
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = n.extend({}, this.constructor.defaults)),
        this.option(e);
      var o = ++d;
      (this.element.outlayerGUID = o), (c[o] = this), this._create();
      var r = this._getOption("initLayout");
      r && this.layout();
    }
    function s(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    var a = t.console,
      h = t.jQuery,
      u = function () {},
      d = 0,
      c = {};
    (r.namespace = "outlayer"),
      (r.Item = o),
      (r.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var l = r.prototype;
    return (
      n.extend(l, e.prototype),
      (l.option = function (t) {
        n.extend(this.options, t);
      }),
      (l._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (l._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize();
      }),
      (l.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (l._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var r = e[o],
            s = new i(r, this);
          n.push(s);
        }
        return n;
      }),
      (l._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (l.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (l.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (l._init = l.layout),
      (l._resetLayout = function () {
        this.getSize();
      }),
      (l.getSize = function () {
        this.size = i(this.element);
      }),
      (l._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (l.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (l._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (l._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (l._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (l._processLayoutQueue = function (t) {
        t.forEach(function (t) {
          this._positionItem(t.item, t.x, t.y, t.isInstant);
        }, this);
      }),
      (l._positionItem = function (t, e, i, n) {
        n ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (l._postLayout = function () {
        this.resizeContainer();
      }),
      (l.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
          var e = this._getContainerSize();
          e &&
            (this._setContainerMeasure(e.width, !0),
            this._setContainerMeasure(e.height, !1));
        }
      }),
      (l._getContainerSize = u),
      (l._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (l._emitCompleteOnItems = function (t, e) {
        function i() {
          o.dispatchEvent(t + "Complete", null, [e]);
        }
        function n() {
          s++, s == r && i();
        }
        var o = this,
          r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
          e.once(t, n);
        });
      }),
      (l.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), h))
          if (((this.$element = this.$element || h(this.element)), e)) {
            var o = h.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (l.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (l.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (l.stamp = function (t) {
        (t = this._find(t)),
          t &&
            ((this.stamps = this.stamps.concat(t)),
            t.forEach(this.ignore, this));
      }),
      (l.unstamp = function (t) {
        (t = this._find(t)),
          t &&
            t.forEach(function (t) {
              n.removeFrom(this.stamps, t), this.unignore(t);
            }, this);
      }),
      (l._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t)))
          : void 0;
      }),
      (l._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (l._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (l._manageStamp = u),
      (l._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t),
          r = {
            left: e.left - n.left - o.marginLeft,
            top: e.top - n.top - o.marginTop,
            right: n.right - e.right - o.marginRight,
            bottom: n.bottom - e.bottom - o.marginBottom,
          };
        return r;
      }),
      (l.handleEvent = n.handleEvent),
      (l.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (l.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (l.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(r, "onresize", 100),
      (l.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (l.needsResizeLayout = function () {
        var t = i(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (l.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (l.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (l.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (l.reveal = function (t) {
        this._emitCompleteOnItems("reveal", t),
          t &&
            t.length &&
            t.forEach(function (t) {
              t.reveal();
            });
      }),
      (l.hide = function (t) {
        this._emitCompleteOnItems("hide", t),
          t &&
            t.length &&
            t.forEach(function (t) {
              t.hide();
            });
      }),
      (l.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (l.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (l.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (l.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (l.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (l.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (r.create = function (t, e) {
        var i = s(r);
        return (
          (i.defaults = n.extend({}, r.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, r.compatOptions)),
          (i.namespace = t),
          (i.data = r.data),
          (i.Item = s(o)),
          n.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      }),
      (r.Item = o),
      r
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(["outlayer/outlayer", "get-size/get-size"], e)
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    return (
      (i.compatOptions.fitWidth = "isFitWidth"),
      (i.prototype._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0;
      }),
      (i.prototype.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          r = o / n,
          s = n - (o % n),
          a = s && 1 > s ? "round" : "floor";
        (r = Math[a](r)), (this.cols = Math.max(r, 1));
      }),
      (i.prototype.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
          i = t ? this.element.parentNode : this.element,
          n = e(i);
        this.containerWidth = n && n.innerWidth;
      }),
      (i.prototype._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = e && 1 > e ? "round" : "ceil",
          n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (
          var o = this._getColGroup(n),
            r = Math.min.apply(Math, o),
            s = o.indexOf(r),
            a = { x: this.columnWidth * s, y: r },
            h = r + t.size.outerHeight,
            u = this.cols + 1 - o.length,
            d = 0;
          u > d;
          d++
        )
          this.colYs[s + d] = h;
        return a;
      }),
      (i.prototype._getColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
          var o = this.colYs.slice(n, n + t);
          e[n] = Math.max.apply(Math, o);
        }
        return e;
      }),
      (i.prototype._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption("originLeft"),
          r = o ? n.left : n.right,
          s = r + i.outerWidth,
          a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        (h -= s % this.columnWidth ? 0 : 1), (h = Math.min(this.cols - 1, h));
        for (
          var u = this._getOption("originTop"),
            d = (u ? n.top : n.bottom) + i.outerHeight,
            c = a;
          h >= c;
          c++
        )
          this.colYs[c] = Math.max(d, this.colYs[c]);
      }),
      (i.prototype._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (i.prototype._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (i.prototype.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  });
function regrid() {
  $(".grid").masonry({
    itemSelector: ".grid-item",
  });
}

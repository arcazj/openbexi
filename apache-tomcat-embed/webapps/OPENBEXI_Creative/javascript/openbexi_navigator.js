/* This notice must be untouched at all times.

 Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
 OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
 updated: September 28 2013 version 5.0
 The latest version is available at http://www.openbexi.com

 This program is free software; you can redistribute it and/or
 modify it under the terms of the GNU General Public License
 as published by the Free Software Foundation; either version 2
 of the License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program; if not, write to the Free Software
 Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

 Note:
 OPEN OPENBEXI htmlbuilder uses dojo Toolkit (http://dojotoolkit.org/).
 OPEN OPENBEXI htmlbuilder uses query.min.js, jquery-ui.min.js, jQueryRotate.js, jquery.ui.touch-punch.min.js, jquery.jsPlumb-1.5.2-min.js, codemirror.js, fabrics.js
 */


var ob_debug_navigator = false;
var ob_debug_openbexi = true;

var openbexiNavigator = null;

var _ob_menuId_focus = null;

var ob_menu_debugging_exception = true;
var ob_menu_debugging_error = true;
var ob_menu_debugging_html = true;
var ob_menu_debugging_warning = false;
var ob_menu_debugging_function = false;
var ob_menu_debugging_classe = false;
var ob_menu_debugging_data = false;
var ob_menu_debugging_info = false;
var ob_menu_debugging_event = true;

var ob_dhtml_menu_editor = false;

var openbexi_navigators = new Array();
var openbexi_CSSPickers = new Array();

var ob_addMetaTags = {
    ob_state0: {
        title: '<b>Meta Tags description</b>',
        html: '<label>Meta Tags are a series of sentences to let the search engine know what each web page in your web site is about. </label><br /><label>Enter Meta Tags to optimize your Web Site ranking:</label><br /><br /><b><label class="ob_label">Description:</label></b><input class="ob_textarea" id="ob_description" type="text" name="ob_description" size="50" value=' + openbexi_getPageData(null, "page", "metaTags", "description") + '>',
        buttons: { Next: true, Cancel: false },
        focus: "input[name='ob_description']",
        position: { container: '#ob_menu_editor', x: -100, y: 80, width: 550, arrow: 'tc' },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                e.preventDefault();
                if (v) {
                    var ob_description = document.getElementById("ob_description").value;
                    openbexi_updatePageData(null, "page", "metaTags", "description", ob_description);
                    ob_setDirty_flag(true);
                    $ob_jquery.prompt.goToState('ob_state1');
                    return false;
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_addmetaTag)", "Exception:" + e.message);
            }
        }
    },
    ob_state1: {
        title: '<b>Meta Tags keywords</b>',
        html: '<label>Keywords --- enter keywords Meta Tags: </label><br /><br /><b><label class="ob_label">Keywords:</label></b><input class="ob_textarea" id="ob_keywords" type="text" name="ob_keywords" size="60" value=' + openbexi_getPageData(null, "page", "metaTags", "keywords") + '>',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_keywords']",
        position: { container: '#ob_menu_editor', x: -100, y: 80, width: 550, arrow: 'tc' },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                e.preventDefault();
                if (v) {
                    var ob_keywords = document.getElementById("ob_keywords").value;
                    openbexi_updatePageData(null, "page", "metaTags", "keywords", ob_keywords);
                    ob_setDirty_flag(true);
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_addmetaTag)", "Exception:" + e.message);
            }
        }
    }
};
var ob_addPageTitle = {
    ob_state: {
        title: '<b>Web page title</b>',
        html: '<label>enter Web page title: </label><br /><br /><b><label class="ob_label">Title:</label></b><input class="ob_textarea" id="ob_addPageTitle" type="text" name="ob_addPageTitle" size="60" value=' + openbexi_getPageData(null, "page", "title", "text") + '>',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_addPageTitle']",
        position: { container: '#ob_menu_editor', x: -140, y: 80, width: 550, arrow: 'tc' },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                if (v) {
                    var ob_titlePage = document.getElementById("ob_addPageTitle").value;
                    if (ob_titlePage == "") {
                        ob_titlePage = "Created with OPEN BEXI htmlbuilder-http://sourceforge.net/projects/ob-htmlbuilder";
                        openbexi_updatePageData(null, "page", "title", "text", ob_titlePage);
                    }
                    ob_setDirty_flag(true);
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_addPageTitle)", "Exception:" + e.message);
            }
        }
    }
}
var ob_preview = {
    ob_state: {
        title: '<b>Preview</b>',
        html: '<label>Before previewing this HTML page you have to rename this page.</label><br /><label>Otherwise the default name will be: \"no_name.html\": </label><br /><br /><b><label class="ob_label">WEB page:</label></b><input class="ob_textarea" id="ob_preview" type="text" name="ob_preview" size="40" value="no_name.html">',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_preview']",
        position: { container: '#ob_menu1_div2', x: 30, y: 100, width: 450, arrow: 'bl' },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                if (v) {
                    openbexiNavigator.HTML_pageName = document.getElementById("ob_preview").value;
                    openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
                    openbexiNavigator.set_webPageName(openbexiNavigator.HTML_pageName.replace(".html", ""));
                    if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "" || openbexiNavigator.HTML_pageName == "openbexi.do") {
                        openbexiNavigator.HTML_pageName = "no_name.html";
                    }
                    ob_setDirty_flag(true);
                    openbexi_save_HTML_page(true, true, false);
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_preview)", "Exception:" + e.message);
            }
        }
    }
};
var ob_select_CSS = {
    ob_state: {
        title: '<b> CSS Editor:</b><br>',
        buttons: {"Apply": true, Cancel: false},
        position: { container: '#ob_menu_FileBrowser', x: -530, y: 20, width: 450, arrow: 'rb' },
        zIndex: 99999,
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = true;
                if (v) {
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_select_CSS)", "Exception:" + e.message);
            }
        }
    }
}
var ob_manage_exception = {
    ob_state: {
        title: '<img src="gif/warning_x32.png"><b> Exception:</b><br>',
        position: { container: '#ob_menu_FileBrowser', x: -600, y: 20, width: 450, arrow: 'rb' },
        buttons: { Ok: false},
        zIndex: 99999,
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = true;
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_manage_exception)", "Exception:" + e.message);
            }
        }
    }
}
var ob_rename_button = {
    ob_state: {
        buttons: { Ok: false},
        zIndex: 99999,
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = true;

                if (getSelectedBexiObj(null).button.childNodes[0])getSelectedBexiObj(null).button.removeChild(getSelectedBexiObj(null).button.childNodes[0]);
                getSelectedBexiObj(null).button.appendChild(document.createTextNode(document.getElementById("ob_jqi_rename_button").value));
                if (!getSelectedBexiObj(null).button.childNodes[0])getSelectedBexiObj(null).button.innerHTML = document.getElementById("ob_jqi_rename_button").value;

                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_rename_button)", "Exception:" + e.message);
            }
        }
    }
}
var ob_rename_link = {
    ob_state: {
        buttons: { Ok: false},
        zIndex: 99999,
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = true;

                if (getSelectedBexiObj(null).link.childNodes[0])getSelectedBexiObj(null).link.removeChild(getSelectedBexiObj(null).link.childNodes[0]);
                getSelectedBexiObj(null).link.appendChild(document.createTextNode(document.getElementById("ob_jqi_rename_link").value));
                if (!getSelectedBexiObj(null).link.childNodes[0])getSelectedBexiObj(null).link.innerHTML = document.getElementById("ob_jqi_rename_link").value;

                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_rename_link)", "Exception:" + e.message);
            }
        }
    }
}
var ob_select_WebPage = {
    ob_state: {
        title: '<b> From this file browser:</b><br><br>Please select or create a project.<br> Then  select or create a WEB page: ',
        buttons: {"Load the last working WEB page": true, Ok: false},
        position: { container: '#ob_menu_FileBrowser', x: -530, y: 20, width: 450, arrow: 'rb' },
        zIndex: 99999,
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = true;
                if (v) {
                    openbexiNavigator.go_to_the_last_webPage(e);
                } else {
                    openbexiNavigator.HTML_pageName = "no_name.html";
                    openbexiNavigator.projectName = "no_name";
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_select_WebPage)", "Exception:" + e.message);
            }
        }
    }
}
var ob_add_NewProject = {
    ob_state: {
        title: '<b> Creating a new project </b>',
        html: '<label><b>Please enter the project name.</b></label><br /><br /><br /><input class="ob_textarea" id="ob_add_NewProject" type="text" name="ob_add_NewProject" size="56" value="">',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_add_NewProject']",
        position: { container: '#ob_menu1_div2', x: 130, y: 110, width: 450 },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v) {
                    openbexiNavigator.projectName = document.getElementById("ob_add_NewProject").value;
                    openbexiNavigator.projectName = openbexi_clearText(openbexiNavigator.projectName);
                    if (openbexiNavigator.projectName == null || openbexiNavigator.projectName == "") {
                        openbexiNavigator.projectName = "no_name";
                    }
                    openbexiNavigator.prompt_close(e);
                    openbexiNavigator.deleteBodyWebPage(e, false);
                    openbexiNavigator.create_new_project(openbexiNavigator.projectName);
                }
                openbexiNavigator.prompt_close(e);
                return state;
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_add_NewProject)", "Exception:" + e.message);
            }
        }
    }
}
var ob_add_NewCategory = {
    ob_state: {
        title: '<b> Creating a new template category </b>',
        html: '<label><b>Please enter the template category name.</b></label><br /><br /><br /><input class="ob_textarea" id="ob_add_NewCategory" type="text" name="ob_add_NewCategory" size="56" value="">',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_add__NewCategory']",
        position: { container: '#ob_menu1_div2', x: 130, y: 110, width: 450 },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v) {
                    openbexiNavigator.projectName = document.getElementById("ob_add_NewCategory").value;
                    openbexiNavigator.projectName = openbexi_clearText(openbexiNavigator.projectName);
                    if (openbexiNavigator.projectName == null || openbexiNavigator.projectName == "") {
                        openbexiNavigator.projectName = "no_name";
                    }
                    openbexiNavigator.prompt_close(e);
                    openbexiNavigator.deleteBodyWebPage(e, false);
                    openbexiNavigator.create_new_category(openbexiNavigator.projectName);
                }
                openbexiNavigator.prompt_close(e);
                return state;
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_add_NewCategory)", "Exception:" + e.message);
            }
        }
    }
}
var ob_add_NewTemplate = {
    ob_state: {
        buttons: { Ok: -1, "No thanks I want to create my own template": true, Cancel: false },
        position: { container: '#ob_menu_FileBrowser', x: -590, y: 80, width: 550, arrow: 'rb' },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v == -1) {
                    openbexiNavigator.HTML_pageName = "template.html";
                    openbexiNavigator.set_webPageName("template.html");
                    openbexi_updatePageData(null, "ob_explorer", "template", "status", "adding");
                    openbexiNavigator.prompt_close(e);
                } else if (v) {
                    if (document.getElementById('ob_menu_widget') != null && document.getElementById('ob_menu_widget').style.visibility == "hidden")
                        openbexiNavigator.window_factory(null, 'ob_menu_widget', ob_menu_widget, "minimize");
                    if (document.getElementById('ob_menu_RequestBrowser') != null && document.getElementById('ob_menu_RequestBrowser').style.visibility != "hidden")
                        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', null, "hidden");
                    if (document.getElementById('ob_menu_CSS') != null && document.getElementById('ob_menu_CSS').style.visibility != "hidden")
                        openbexiNavigator.window_factory(null, 'ob_menu_CSS', null, 'hidden');
                    if (document.getElementById('ob_menu_PictureBrowser') != null && document.getElementById('ob_menu_PictureBrowser').style.visibility != "hidden")
                        openbexiNavigator.window_factory(null, 'ob_menu_PictureBrowser', null, "hidden");
                    if (document.getElementById('ob_menu_FileBrowser') != null && document.getElementById('ob_menu_FileBrowser').style.visibility != "hidden")
                        openbexiNavigator.window_factory(null, 'ob_menu_FileBrowser', null, "hidden");
                    openbexiNavigator.HTML_pageName = "template.html";
                    openbexiNavigator.set_webPageName("template.html");
                    $ob_jquery.prompt.goToState('close');
                }
                else {
                    openbexiNavigator.HTML_pageName = "no_name.html";
                    openbexiNavigator.set_webPageName("no_name.html");
                    $ob_jquery.prompt.goToState(ob_add_NewPage);
                    return state;
                }
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_add_NewTemplate)", "Exception:" + e.message);
            }
        }
    },
    ob_add_NewPage: {
        title: '<b> Creating a new WEB Page </b>',
        html: '<label><b>Please enter the name.</b></label><br /><label>Otherwise the default name will be: \"no_name.html\": </label><br /><br /><input class="ob_textarea" id="ob_add_NewPage" type="text" name="ob_add_NewPage" size="56" value="no_name.html">',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_add_NewPage']",
        position: { container: '#ob_menu1_div2', x: 130, y: 110, width: 450 },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v) {
                    openbexiNavigator.HTML_pageName = document.getElementById("ob_add_NewPage").value;
                    openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
                    openbexiNavigator.set_webPageName(openbexiNavigator.HTML_pageName.replace(".html", ""));
                    if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "" || openbexiNavigator.HTML_pageName == "openbexi.do") {
                        openbexiNavigator.HTML_pageName = "no_name.html";
                        openbexiNavigator.set_webPageName("no_name.html");
                    }
                    openbexiNavigator.deleteBodyWebPage(e, true);
                    state = true;
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_add_NewPage)", "Exception:" + e.message);
            }
        }
    },
    close: {
        title: '<b> Creating a new empty template </b>',
        html: '<label>Congratulations, you are done</label>',
        buttons: { Close: 0 },
        focus: 0,
        position: { container: '#ob_menu_FileBrowser', x: -530, y: 20, width: 450 },
        close: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                openbexiNavigator.prompt_close(e);
                return false;
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_close_NewTemplate)", "Exception:" + e.message);
            }
        }
    }

}
var ob_add_NewPage = {
    ob_state: {
        title: '<b> Creating a new WEB page </b>',
        html: '<label><b>Please enter the name.</b></label><br /><label>Otherwise the default name will be: \"no_name.html\": </label><br /><br /><input class="ob_textarea" id="ob_add_NewPage" type="text" name="ob_add_NewPage" size="56" value="no_name.html">',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_add_NewPage']",
        position: { container: '#ob_menu1_div2', x: 130, y: 110, width: 450 },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v) {
                    openbexiNavigator.HTML_pageName = document.getElementById("ob_add_NewPage").value;
                    openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
                    openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName.replace(".html", "");
                    openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName + ".html";
                    openbexiNavigator.set_webPageName(openbexiNavigator.HTML_pageName.replace(".html", ""));
                    if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "" || openbexiNavigator.HTML_pageName == "openbexi.do") {
                        openbexiNavigator.HTML_pageName = "no_name.html";
                        openbexiNavigator.set_webPageName("no_name.html");
                    }
                    openbexiNavigator.deleteBodyWebPage(e, true);
                    state = true;
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_add_NewPage)", "Exception:" + e.message);
            }
        }
    }
};
var ob_delete_WebPage = {
    ob_state: {
        title: '<b> Deleting a  WEB Page </b>',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_delete_WebPage']",
        position: { container: '#ob_menu1_div2', x: 130, y: 110, width: 450 },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v) {
                    openbexiNavigator.removeWebPages(event);
                    state = true;
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_delete_WebPage)", "Exception:" + e.message);
            }
        }
    }
};
var ob_add_NewTemplatePage = {
    ob_state: {
        title: '<b> Creating a new WEB template Page </b>',
        html: '<label><b>Please enter the name.</b></label><br /><label>Otherwise the default name will be: \"no_name.html\": </label><br /><br /><input class="ob_textarea" id="ob_add_NewTemplatePage" type="text" name="ob_add_NewPage" size="56" value="no_name.html">',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_add_NewTemplatePage']",
        position: { container: '#ob_menu1_div2', x: 130, y: 110, width: 450 },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v) {
                    openbexiNavigator.HTML_pageName = document.getElementById("ob_add_NewTemplatePage").value;
                    openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
                    openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName.replace(".html", "");
                    openbexiNavigator.HTML_pageName = openbexiNavigator.HTML_pageName + ".html";
                    openbexiNavigator.set_webPageName(openbexiNavigator.HTML_pageName.replace(".html", ""));
                    if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "" || openbexiNavigator.HTML_pageName == "openbexi.do") {
                        openbexiNavigator.HTML_pageName = "no_name.html";
                        openbexiNavigator.set_webPageName("no_name.html");
                    }
                    openbexi_updateWebPrivateData(null, "bexicontext", "ob_navigator", "mode", "ob_template");
                    openbexiNavigator.deleteBodyWebPage(e, true);
                    state = true;
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_add_NewTemplatePage)", "Exception:" + e.message);
            }
        }
    }
};
var ob_add_NewTemplatePage2project = {
    ob_state: {
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_add_NewTemplatePage2project']",
        position: { container: '#ob_menu1_div2', x: 130, y: 110, width: 450 },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                var state = false;
                if (v) {
                    var template = document.getElementById("ob_add_NewTemplate").value;
                    var category = document.getElementById("ob_categoryTemplate").value;
                    openbexiNavigator.open_new_template_page(category, template, false);
                    state = true;
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_add_NewTemplatePage2project)", "Exception:" + e.message);
            }
        }
    }
};

var ob_savePage = {
    ob_state: {
        title: '<b> Saving the current WEB Page </b>',
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_savePage_WEB_page']",
        position: { container: '#ob_menu1_div2', x: -60, y: 115, width: 550, arrow: 'tl' },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                if (v) {
                    var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");
                    if (navigator_mode == "ob_template") {
                        openbexiNavigator.templateCategory = document.getElementById("ob_savePage_Project").value;
                        openbexiNavigator.templateCategory = openbexi_clearText(openbexiNavigator.projectName);
                    }
                    openbexiNavigator.projectName = document.getElementById("ob_savePage_Project").value;
                    openbexiNavigator.projectName = openbexi_clearText(openbexiNavigator.projectName);
                    openbexiNavigator.set_webPageName(openbexiNavigator.projectName.replace(".html", ""));
                    if (openbexiNavigator.projectName == null || openbexiNavigator.projectName == "") {
                        openbexiNavigator.projectName = "no_name";
                    }
                    openbexiNavigator.HTML_pageName = document.getElementById("ob_savePage_WEB_page").value;
                    openbexiNavigator.HTML_pageName = openbexi_clearText(openbexiNavigator.HTML_pageName);
                    openbexiNavigator.set_webPageName(openbexiNavigator.HTML_pageName.replace(".html", ""));
                    if (openbexiNavigator.HTML_pageName == null || openbexiNavigator.HTML_pageName == "" || openbexiNavigator.HTML_pageName == "openbexi.do") {
                        openbexiNavigator.HTML_pageName = "no_name.html";
                    }
                    ob_setDirty_flag(true);
                    openbexi_save_HTML_page(false, true, false);
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_preview)", "Exception:" + e.message);
                openbexiNavigator.prompt_close(e);
            }
        }
    }
};

function ob_update_navigators(navigator) {
    for (var i = openbexi_navigators.length - 1; i >= 0; i--) {
        if (openbexi_navigators[i].id == navigator.id) {
            openbexi_navigators[i] = navigator;
        }
    }
}
function ob_save_navigators(navigator) {
    var navigatorC = ob_get_navigator(navigator.id);
    if (navigatorC != null) return;
    var length = openbexi_navigators.length;
    openbexi_navigators[length] = navigator;
}
function ob_get_navigator(name) {
    for (var i = openbexi_navigators.length - 1; i >= 0; i--) {
        if (openbexi_navigators[i].id == name) {
            return openbexi_navigators[i];
        }
    }
    return null;
}
function ob_update_CSSPicker(widget_type, CSSPicker) {
    for (var i = openbexi_CSSPicker.length - 1; i >= 0; i--) {
        if (openbexi_CSSPickers[i][0] == widget_type) {
            openbexi_CSSPickers[i][1] = CSSPicker;
        }
    }
}
function ob_save_CSSPickers(widget_type, CSSPicker) {
    var CSSPickerC = ob_get_CSSPicker(widget_type);
    if (CSSPickerC != null) return;
    var length = openbexi_CSSPickers.length;
    openbexi_CSSPickers[length] = new Array;
    openbexi_CSSPickers[length][0] = widget_type;
    openbexi_CSSPickers[length][1] = CSSPicker;
}
function ob_get_CSSPicker(widget_type) {
    for (var i = openbexi_CSSPickers.length - 1; i >= 0; i--) {
        if (openbexi_CSSPickers[i][0] == widget_type) {
            return openbexi_CSSPickers[i][1];
        }
    }
    return null;
}
var openbexi_navigator = function (name, pager) {

    this._ob_dhtml_JavascriptBrowser = false;
    this._ob_dhtml_PictureBrowser = false;
    this._ob_dhtml_widget = false;
    this._ob_dhtml_CSS = false;
    this._ob_dhtml_debugging = false;
    this._ob_dhtml_FileBrowser = false;
    this._ob_dhtml_TemplateBrowser = false;
    this._ob_dhtml_RequestBrowser = false;
    this._ob_dhtml_SQLBrowser = false;
    this._ob_dhtml_FTPBrowser = false;

    try {
        this.id = name;
        if (pager != undefined) {
            this.navigator = document.createElement("div");
            this.pager = pager;
            this.navigator.id = name;
            this.maxItems = 10;
            return this;
        }
        this.New_projectName = "";
        this.New_HTML_pageName = "";
        this.working = false;
        this.prompt_working = false;
        this.init = true;
        this.server_connection = 0;
        this.ticket_id = 0;
        this.load_timeout = 15000;
        this.mode = "projects";
        this.css_mode = "none";
        this.css_editor_mode = "tree";
        this.action = "none";
        this.sub_mode = "getWebProjects";
        this.projectName = "no_name";
        this.webPageName = "no_name";
        this.filename = "no_name";
        this.templateCategory = "no_name";
        this.templateName = "no_name";
        this.file_filter = "";
        this.dir_filter = "";
        this.current_JS_selected = "";
        this.maxItems = 100;
        this.maxMediaItems = 20;
        this.maxJavascriptItems = 20;
        this.path = "";
        this.browse_picture_path = null;
        this.ob_menu_widget_pager = null;
        this.ob_menu_PictureBrowser_pager = null;
        this.ob_menu_SQLBrowser_pager = null;
        this.ob_menu_JavascriptBrowser_pager = null;
        this.pager = new openbexi_pager(null, null, name, top, "2px", "25px", "15px", "23px", 10, "static");
        //ob_save_navigators(this);
        this.set_HTML_pageName(null);
        this.FileBrowser_json_tree = [];
        this.FileBrowser_tree = null;
        this.FileBrowser_tree_first_start = true;
        this.JSBrowser_tree = null;
        this.JSBrowser_tree_first_start = true;
        this.FTPBrowser_json_tree = [];
        this.FTPBrowser_tree = null;
        this.FTPBrowser_tree_first_start = true;
        this.SQLBrowser_json_tree = [];
        this.SQLBrowser_tree = null;
        this.SQLBrowser_tree_first_start = true;
        this.RequestBrowser_json_tree = [];
        this.PictureBrowser_json_tree = [
            {
                label: '..',
                id: 'up',
                dir: 'up',
                status: 'none',
                children: [
                    {
                        label: '..',
                        id: 'up0',
                        dir: 'up0',
                        status: 'none'
                    }
                ]
            },
            {
                label: 'images',
                id: 'images',
                dir: 'images',
                status: 'none'
            }
        ];
        this.ob_CSS_editor_json_tree = [
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg7\\\',\\\'ob_slide_div7\\\',\\\'ob_slide_frame7\\\');\">Font Color</b>',
                id: 'ob_color_bg',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg7></a>',
                        id: 'ob_color_bg_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);\">Font family</b>',
                id: 'ob_font.CSS',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Times New Roman\');" face="Times New Roman">Times New Roman</font></a>',
                        id: 'ob_font1',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Courier\');" face="Courier">Courier</font></a>',
                        id: 'ob_font2',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Courier New\');" face="Courier New">Courier New</font></a>',
                        id: 'ob_font3',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Tahoma\');" face="Tahoma">Tahoma</font></a>',
                        id: 'ob_font4',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event,\'fontFamily\', \'Arial\');" face="Arial">Arial</font></a>',
                        id: 'ob_font5',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'MS Arial\');" face="MS Arial">MS Arial</font></a>',
                        id: 'ob_font6',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'sans-serif\');" face="sans-serif">sans-serif</font></a>',
                        id: 'ob_font8',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Myriad\');" face="Myriad">Myriad</font></a>',
                        id: 'ob_font9',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Garamond\');" face="Garamond">Garamond</font></a>',
                        id: 'ob_font11',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'MS Georgia\');" face="MS Georgia">MS Georgia</font></a>',
                        id: 'ob_font12',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event, \'fontFamily\\\", \\\"Helvetica\');" face="Helvetica">Helvetica</font></a>',
                        id: 'ob_font14',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Caflisch\');" face="Caflisch">Caflisch</font></a>',
                        id: 'ob_font15',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'Garamond\');" face="Garamond">Garamond</font></a>',
                        id: 'ob_font17',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(event,\'fontFamily\', \'More\');" face="Arial">More ...</font></a>',
                        id: 'ob_font20',
                        status: '__FONT'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\'ob_slide_bg6\',\'ob_slide_div6\',\'ob_slide_frame6\');\">Font size</b>',
                id: 'ob_font_size',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg6></a>',
                        id: 'ob_font_size_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);\">Font style</b>',
                id: 'ob_font_style.CSS',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'fontStyle\', \'removeFormat\')\"; >Normal</font></a>',
                        id: 'normal',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick="openbexi_setCSSValue(null,\'fontStyle\',\'italic\');"><i>Italic</i></font></a>',
                        id: 'italic',
                        status: '__ITALIC'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event,\'fontStyle\', \'bold\')\"; style="font-weight:bold";>Bold</font></a>',
                        id: 'bold',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event,\'fontStyle\', \'underline\')\"; >Underline</font></a>',
                        id: 'underline',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'fontStyle\', \'strikethrough\')\"; >Strikethrough</font></a>',
                        id: 'strikethrough',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'fontStyle\', \'subscript\')\"; >Subscript</font></a>',
                        id: 'subscript',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'fontStyle\', \'superscript\')\"; >Superscript</font></a>',
                        id: 'superscript',
                        status: '__FONT'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);\">More ...</b>',
                id: 'ob_more_style.CSS',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'more\', \'justifyLeft\')\"; >Justify left</font></a>',
                        id: 'ob_justifyLeft',
                        status: '__MORE'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event,\'more\', \'justifyRight\')\"; ;>Justify right</font></a>',
                        id: 'justifyRight',
                        status: '__MORE'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event,\'more\', \'justifyCenter\')\";>Justify center</font></a>',
                        id: 'justifyCenter',
                        status: '__MORE'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'more\', \'justifyFull\')\";>Justify full</font></a>',
                        id: 'justifyFull',
                        status: '__MORE'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'more\', \'outdent\')\";>Outdent</font></a>',
                        id: 'Outdent',
                        status: '__MORE'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'more\', \'indent\')\";>Indent</font></a>',
                        id: 'indent',
                        status: '__MORE'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event,\'more\', \'insertOrderedList\')\";>InsertOrderedList</font></a>',
                        id: 'insertOrderedList',
                        status: '__MORE'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\' url(gif/fading_background_9.png)\';this.style.cursor=\'pointer\';" onmouseout="this.style.background=\'\'; this.style.cursor=\'\';"><font onclick=\"openbexi_setCSSValue(event, \'more\', \'insertUnorderedList\')\";>InsertUnorderedList</font></a>',
                        id: 'insertUnorderedList',
                        status: '__MORE'
                    }
                ]
            }
        ];
        this.ob_CSS_json_tree = [
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg5\\\',\\\'ob_slide_div5\\\',\\\'ob_slide_frame5\\\');\">Body background</b>',
                id: 'ob_body_border',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg5></a>',
                        id: 'ob_border_body',
                        status: 'none'
                    }
                ]
            },

            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg0\\\',\\\'ob_slide_div0\\\',\\\'ob_slide_frame0\\\');\">Border</b>',
                id: 'ob_border',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg0></a>',
                        id: 'ob_border_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg1\\\',\\\'ob_slide_div1\\\',\\\'ob_slide_frame1\\\');\">Border-radius</b>',
                id: 'ob_border-radius',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg1></a>',
                        id: 'ob_border-radius_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg2\\\',\\\'ob_slide_div2\\\',\\\'ob_slide_frame2\\\');\">Box-shadow</b>',
                id: 'ob_box-shadow',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg2></a>',
                        id: 'ob_box-shadow_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg3\\\',\\\'ob_slide_div3\\\',\\\'ob_slide_frame3\\\');\">Background-gradient</b>',
                id: 'ob_background-gradient',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg3></a>',
                        id: 'ob_background-gradient_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg4\\\',\\\'ob_slide_div4\\\',\\\'ob_slide_frame4\\\');\">Opacity</b>',
                id: 'ob_opacity',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg4></a>',
                        id: 'ob_opacity_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\"  onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexiNavigator.set_css_mode(\\\'backgroundImage\\\');\">Background image</b>',
                id: 'ob_bg_img_style.CSS',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"openbexiNavigator.browse_picture(\\\'background\\\',\\\'none\\\',null,\\\'tree\\\',true,false);openbexiNavigator.set_css_mode(\\\'backgroundImage\\\');\" style="font-oblique:oblique";>Pick background</font></a>',
                        id: 'ob_bg_img_style',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"openbexi_setCSSValue(null, \\\'backgroundRepeat\\\', \\\'no-repeat\\\');openbexiNavigator.set_css_mode(\\\'backgroundImage\\\');\" style="font-oblique:oblique";>No-repeat</font></a>',
                        id: 'ob_bg_img_style1',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"openbexi_setCSSValue(null, \\\'backgroundRepeat\\\', \\\'repeat\\\');openbexiNavigator.set_css_mode(\\\'backgroundImage\\\');\" style="font-oblique:oblique";>repeat</font></a>',
                        id: 'ob_bg_img_style3',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"openbexi_setCSSValue(null, \\\'backgroundPosition\\\', \\\'center\\\');openbexiNavigator.set_css_mode(\\\'backgroundImage\\\');\" style="font-oblique:oblique";>Center</font></a>',
                        id: 'ob_bg_img_style2',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"openbexi_setCSSValue(null, \\\'backgroundImage\\\', \\\'none\\\');openbexiNavigator.set_css_mode(\\\'none\\\');\" style="font-oblique:oblique";>No background</font></a>',
                        id: 'ob_bg_img_style4',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);\">Alignment-Spacing</b>',
                id: 'ob_alignment',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).align_left_auto_arrange();\" >AlignLeftAutoArrange</font></a>',
                        id: 'AlignLeftAutoArrange',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).align_right_auto_arrange();\" >AlignRightAutoArrange</font></a>',
                        id: 'AlignRightAutoArrange',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).align_top_auto_arrange();\" >AlignTopAutoArrange</font></a>',
                        id: 'AlignTopAutoArrange',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).align_bottom_auto_arrange();\" >AlignBottomAutoArrange</font></a>',
                        id: 'AlignBottomAutoArrange',
                        status: 'none'
                    } ,
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).vertical_spacing_auto_arrange();\" >VerticalSpacingAutoArrange</font></a>',
                        id: 'VerticalSpacingAutoArrange',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).horizontal_spacing_auto_arrange();\" >HorizontalSpacingAutoArrange</font></a>',
                        id: 'HorizontalSpacingAutoArrange',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).vertical_width_auto_resize();\" >VerticalWidthAutoResize</font></a>',
                        id: 'VerticalWidthAutoResize',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).vertical_height_auto_resize();\" >VerticalHeightAutoResize</font></a>',
                        id: 'VerticalHeightAutoResize',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).horizontal_height_auto_resize();\" >HorizontalHeightAutoResize</font></a>',
                        id: 'HorizontalHeightAutoResize',
                        status: 'none'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';\"><font onclick=\"getSelectedBexiObj(null).horizontal_width_auto_resize();\" >HorizontalWidthAutoResize</font></a>',
                        id: 'HorizontalWidthAutoResize',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg7\\\',\\\'ob_slide_div7\\\',\\\'ob_slide_frame7\\\');\">Font Color</b>',
                id: 'ob_color_bg',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg7></a>',
                        id: 'ob_color_bg_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);\">Font family</b>',
                id: 'ob_font.CSS',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Times New Roman\\\');" face="Times New Roman">Times New Roman</font></a>',
                        id: 'ob_font1',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Courier\\\');" face="Courier">Courier</font></a>',
                        id: 'ob_font2',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Courier New\\\');" face="Courier New">Courier New</font></a>',
                        id: 'ob_font3',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Tahoma\\\');" face="Tahoma">Tahoma</font></a>',
                        id: 'ob_font4',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick=\"openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Arial\\\');" face="Arial">Arial</font></a>',
                        id: 'ob_font5',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'MS Arial\\\');" face="MS Arial">MS Arial</font></a>',
                        id: 'ob_font6',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'sans-serif\\\');" face="sans-serif">sans-serif</font></a>',
                        id: 'ob_font8',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Myriad\\\');" face="Myriad">Myriad</font></a>',
                        id: 'ob_font9',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Garamond\\\');" face="Garamond">Garamond</font></a>',
                        id: 'ob_font11',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'MS Georgia\\\');" face="MS Georgia">MS Georgia</font></a>',
                        id: 'ob_font12',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event, \\\'fontFamily\\\", \\\"Helvetica\\\');" face="Helvetica">Helvetica</font></a>',
                        id: 'ob_font14',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Caflisch\\\');" face="Caflisch">Caflisch</font></a>',
                        id: 'ob_font15',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Adobe Poetica\\\');" face="Adobe Poetica">Adobe Poetica</font></a>',
                        id: 'ob_font16',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'Garamond\\\');" face="Garamond">Garamond</font></a>',
                        id: 'ob_font17',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event,\\\'fontFamily\\\', \\\'More\\\');" face="Arial">More ...</font></a>',
                        id: 'ob_font20',
                        status: '__FONT'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexi_display_css3(event,\\\'ob_slide_bg6\\\',\\\'ob_slide_div6\\\',\\\'ob_slide_frame6\\\');\">Font size</b>',
                id: 'ob_font_size',
                status: 'none',
                children: [
                    {
                        label: '<a id=ob_slide_bg6></a>',
                        id: 'ob_font_size_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);\">Font style</b>',
                id: 'ob_font_style.CSS',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick=\"openbexi_setCSSValue(event, \\\'fontStyle\\\', \\\'normal\\\')\"; style="font-oblique:normal";>Normal</font></a>',
                        id: 'normal',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick=\"openbexi_setCSSValue(event, \\\'fontStyle\\\', \\\'italic\\\')\";><i>Italic</i></font></a>',
                        id: 'italic',
                        status: '__FONT'
                    },
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font onclick="openbexi_setCSSValue(event, \\\'fontWeight\\\', \\\'bold\\\');" style="font-weight:bold";>Bold</font></a>',
                        id: 'bold',
                        status: '__FONT'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);openbexiNavigator.browse_CSS(event,null,null,true);\">Template</b>',
                id: 'ob_template_style',
                status: 'none',
                children: [
                    {
                        label: '<a onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; ></font></a>',
                        id: 'ob_template_1',
                        status: 'none'
                    }
                ]
            },
            {
                label: '<b style=\"cursor:pointer;\" onclick=\"openbexi_collapse_tree_CSSBrowser(event);\">More ...</b>',
                id: 'ob_css_editor',
                status: 'none',
                children: [
                    {
                        label: '<a onclick=\"display_CSS_editor();\" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >CSS editor</font></a>',
                        id: 'ob_css_editor2',
                        status: '__EDIT'
                    },
                    {
                        label: '<a onclick="openbexi_setCSSValue(event,\\\'border\\\', \\\'0px solid black\\\');" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >Remove border</font></a>',
                        id: 'ob_template_0_0',
                        status: '__TEMPLATE'
                    },
                    {
                        label: '<a onclick="openbexi_setCSSValue(event,\\\'border\\\', \\\'1px solid black\\\');openbexi_setCSSValue(event,\\\'borderRadius\\\', \\\'0em 0em 0em 0em\\\');" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >Add squared border</font></a>',
                        id: 'ob_template_0_1',
                        status: '__TEMPLATE'
                    },
                    {
                        label: '<a onclick="openbexi_setCSSValue(event,\\\'border\\\', \\\'1px solid black\\\');openbexi_setCSSValue(event,\\\'borderRadius\\\', \\\'1em 1em 1em 1em\\\');" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >Add rounded border</font></a>',
                        id: 'ob_template_0_2',
                        status: '__TEMPLATE'
                    },
                    {
                        label: '<a onclick="openbexi_setCSSValue(event,\\\'border\\\', \\\'0.25em solid rgb(221, 221, 221)\\\');openbexi_setCSSValue(event,\\\'borderRadius\\\', \\\'1em 1em 1em 1em\\\');" onmouseover="this.style.background=\\\' url(gif/fading_background_9.png)\\\';this.style.cursor=\\\'pointer\\\';" onmouseout="this.style.background=\\\'\\\'; this.style.cursor=\\\'\\\';"><font ; >Add soft rounded border</font></a>',
                        id: 'ob_template_0_3',
                        status: '__TEMPLATE'
                    }

                ]
            }
        ];
        if (document.getElementById("ob_frame_top")) document.getElementById("ob_frame_top").style.left = divPropertiesWidth;
        if (document.getElementById("ob_menu1"))document.getElementById("ob_menu1").style.left = divPropertiesWidth;
        if (document.getElementById("ob_menu_editor"))document.getElementById("ob_menu_editor").style.left = parseInt(document.getElementById("ob_menu1").style.left) + parseInt(document.getElementById("ob_menu1").style.width) + "px";
        if (document.getElementById("ob_menu2"))document.getElementById("ob_menu2").style.left = parseInt(document.getElementById("ob_menu_editor").style.left) + parseInt(document.getElementById("ob_menu_editor").style.width) + "px";

    } catch (e) {
        __openbexi_debugC("openbexi_navigator()", "Exception:" + e.message);
    }
    return this;
}
openbexi_navigator.prototype.set_mode = function (mode) {
    this.mode = mode;
}

openbexi_navigator.prototype.prompt_close = function (event) {
    try {
        openbexiNavigator.prompt_working = false;
        $ob_jquery.prompt.close();
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.prompt_close()", "Exception:" + e.message);
    }
}
var goInBg_prompt;
openbexi_navigator.prototype.prompt = function (event, states) {
    openbexi_stopEventPropagation(event);

    if (this.prompt_working) return;
    this.prompt_working = true;
    try {
        clearTimeout(goInBg_prompt);
        goInBg_prompt = setTimeout(function () {
            $ob_jquery.prompt(states);
            openbexiNavigator.prompt_working = false;
        }, 50);
    }
    catch
            (e) {
        __openbexi_debugC("openbexi_navigator.prototype.prompt()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.set_css_mode = function (mode, div_id) {
    this.css_mode = mode;
    this.css_div = div_id;
}
openbexi_navigator.prototype.status = function (text, color, url) {
    try {
        if (text == null)return;
        if (url || url == undefined) url = "";
        if (text == "Working ..." || text == "Still working ...") {
            text = openbexi_lang(text) + " " + url;
        }
        //Language translation here:
        else if (text == "SaveFileOK") {
            text = openbexi_lang(text) + ":" + this.HTML_pageName + "\n" + openbexi_lang("UsedLanguage");
        } else {
            if (url == "")
                text = openbexi_lang(text);
            else
                text = openbexi_lang(text) + "\n" + url;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.status()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.set_HTML_pageName = function (current_page) {
    try {
        //if (current_page == null) return;
        var home_directory;
        home_directory = openbexi_get_home_directory(window.location.pathname);
        if (current_page == null || current_page == undefined || current_page == "") current_page = openbexi_removePath(window.location.pathname, false);
        if (current_page == "openbexi_htmlBuilder.html") {
            this.HTML_pageName = "no_name.html";
            this.hrefPath = window.location.href.replace("openbexi_htmlBuilder.html", "");
        } else if (current_page == "openbexi.do") {
            this.HTML_pageName = "no_name.html";
            this.hrefPath = window.location.href.replace("openbexi.do", "");
        } else {
            this.HTML_pageName = current_page;
            this.hrefPath = window.location.href.replace(current_page, "");
            this.hrefPath = window.location.href.replace("openbexi.do", "");
        }
        this.openbexi_path_html_page = home_directory + this.HTML_pageName;
        this.openbexi_home_directory = home_directory;
        this.href = window.location.href;
        this.HTML_short_pageName = this.HTML_pageName.replace(".html", "");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.set_HTML_pageName()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.set_working_status = function (status) {
    return openbexi_navigator.working = status;
}
openbexi_navigator.prototype.clear_debugger = function () {
    if (document.getElementById("ob_menu_debugging")) document.getElementById("ob_menu_debugging").innerHTML = "";
    openbexi_debugging = 1;
}
openbexi_navigator.prototype.update_size_and_xy = function (div_id) {
    try {
        var div = document.getElementById(div_id);
        if (div.id == "ob_menu_widget") {
            _ob_menu_widget_w = div.style.width;
            _ob_menu_widget_h = div.style.height;
            _ob_menu_widget_x = div.style.left;
            _ob_menu_widget_y = div.style.top;
        }
        if (div.id == "ob_menu_CSS") {
            _ob_menu_CSS_w = div.style.width;
            _ob_menu_CSS_h = div.style.height;
            _ob_menu_CSS_x = div.style.left;
            _ob_menu_CSS_y = div.style.top;
        }
        if (div.id == "ob_menu_debugging") {
            _ob_menu_debugging_w = div.style.width;
            _ob_menu_debugging_h = div.style.height;
            _ob_menu_debugging_x = div.style.left;
            _ob_menu_debugging_y = div.style.top;
        }
        if (div.id == "ob_menu_FileBrowser") {
            _ob_menu_FileBrowser_w = div.style.width;
            _ob_menu_FileBrowser_h = div.style.height;
            _ob_menu_FileBrowser_x = div.style.left;
            _ob_menu_FileBrowser_y = div.style.top;
        }
        if (div.id == "ob_menu_JavascriptBrowser") {
            _ob_menu_JavascriptBrowser_w = div.style.width;
            _ob_menu_JavascriptBrowser_h = div.style.height;
            _ob_menu_JavascriptBrowser_x = div.style.left;
            _ob_menu_JavascriptBrowser_y = div.style.top;
        }
        if (div.id == "ob_menu_PictureBrowser") {
            _ob_menu_PictureBrowser_w = div.style.width;
            _ob_menu_PictureBrowser_h = div.style.height;
            _ob_menu_PictureBrowser_x = div.style.left;
            _ob_menu_PictureBrowser_y = div.style.top;
        }
        if (div.id == "ob_menu_TemplateBrowser") {
            _ob_menu_TemplateBrowser_w = div.style.width;
            _ob_menu_TemplateBrowser_h = div.style.height;
            _ob_menu_TemplateBrowser_x = div.style.left;
            _ob_menu_TemplateBrowser_y = div.style.top;
        }
        if (div.id == "ob_menu_RequestBrowser") {
            _ob_menu_RequestBrowser_w = div.style.width;
            _ob_menu_RequestBrowser_h = div.style.height;
            _ob_menu_RequestBrowser_x = div.style.left;
            _ob_menu_RequestBrowser_y = div.style.top;
        }
        if (div.id == "ob_menu_SQLBrowser") {
            _ob_menu_SQLBrowser_w = div.style.width;
            _ob_menu_SQLBrowser_h = div.style.height;
            _ob_menu_SQLBrowser_x = div.style.left;
            _ob_menu_SQLBrowser_y = div.style.top;
        }
        if (div.id == "ob_menu_FTPBrowser") {
            _ob_menu_FTPBrowser_w = div.style.width;
            _ob_menu_FTPBrowser_h = div.style.height;
            _ob_menu_FTPBrowser_x = div.style.left;
            _ob_menu_FTPBrowser_y = div.style.top;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.update_size_and_xy()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.get_ob_menus_MaxLeft = function () {
    try {
        var y = 0;
        if (ob_minimize_menu_list.length == 0) return y;
        if (document.getElementById("ob_logo"))  y = parseInt(document.getElementById("ob_logo").style.left);
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i] != undefined) {
                var tmp_y = parseInt(openbexi_object[i].div.style.left) + parseInt(openbexi_object[i].div.style.width);
                if (tmp_y > y)y = tmp_y;
            }
        }
        return y;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.get_ob_menus_MaxLeft()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.set_ob_menus_MaxLeft = function () {
    try {
        var y = this.get_ob_menus_MaxLeft();
        for (var i = 0; i < ob_minimize_menu_list.length; i++) {
            if (document.getElementById(ob_minimize_menu_list[i] + "_window_manager_img").src.match(RegExp("_full_"))) {
                document.getElementById(ob_minimize_menu_list[i] + "_head").style.left = y + "px";
                if (document.getElementById(ob_minimize_menu_list[i] + "_footer"))document.getElementById(ob_minimize_menu_list[i] + "_footer").style.left = y + "px";
                this.move(ob_minimize_menu_list[i]);
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.set_ob_menus_MaxLeft()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.move_ob_menus = function () {
    try {
        var selected_object = getSelectedBexiObj(null);
        if (selected_object && selected_object != openbexiBody) {
            for (var i = 0; i < ob_minimize_menu_list.length; i++) {
                if (document.getElementById(ob_minimize_menu_list[i] + "_window_manager_img").src.match(RegExp("_full_"))) {
                    if ((parseInt(selected_object.div.style.left) + parseInt(selected_object.div.style.width)) > parseInt(document.getElementById(ob_minimize_menu_list[i]).style.left)) {
                        document.getElementById(ob_minimize_menu_list[i] + "_head").style.left = parseInt(selected_object.div.style.left) + parseInt(selected_object.div.style.width) + "px";
                        if (document.getElementById(ob_minimize_menu_list[i] + "_footer")) document.getElementById(ob_minimize_menu_list[i] + "_footer").style.left = parseInt(selected_object.div.style.left) + parseInt(selected_object.div.style.width) + "px";
                        this.move(ob_minimize_menu_list[i]);
                    }
                }
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.move_ob_menu()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.set_menu_focus = function (ob_menu) {
    //__openbexi_debugC("openbexi_navigator.prototype.set_menu_focus(" + ob_menu + ")", "Info:");
    _ob_menuId_focus = ob_menu;
}
openbexi_navigator.prototype.move = function (ob_menu) {
    try {
        if (ob_menu != undefined)this.set_menu_focus(ob_menu);
        document.getElementById(_ob_menuId_focus).style.top = document.getElementById(_ob_menuId_focus + "_head").style.top;
        if (document.getElementById(_ob_menuId_focus + "_footer")) {
            document.getElementById(_ob_menuId_focus + "_footer").style.top = (parseInt(document.getElementById(_ob_menuId_focus).style.top) + parseInt(document.getElementById(_ob_menuId_focus).style.height)) + "px";
            document.getElementById(_ob_menuId_focus + "_footer").style.left = document.getElementById(_ob_menuId_focus + "_head").style.left;
        }
        document.getElementById(_ob_menuId_focus).style.left = document.getElementById(_ob_menuId_focus + "_head").style.left;
        if (dd.elements[_ob_menuId_focus] != undefined)dd.elements[_ob_menuId_focus].moveTo(parseInt(document.getElementById(_ob_menuId_focus).style.left), parseInt(document.getElementById(_ob_menuId_focus).style.top));
        if (dd.elements[_ob_menuId_focus] != undefined)dd.elements[_ob_menuId_focus].resizeTo(parseInt(document.getElementById(_ob_menuId_focus).style.width), parseInt(document.getElementById(_ob_menuId_focus).style.height));

        document.getElementById(_ob_menuId_focus + "_resize").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) + parseInt(document.getElementById(_ob_menuId_focus).style.left) - parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.width) + "px";
        document.getElementById(_ob_menuId_focus + "_resize").style.top = parseInt(document.getElementById(_ob_menuId_focus).style.height) + parseInt(document.getElementById(_ob_menuId_focus).style.top) - parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.height) + "px";
        if (dd.elements[_ob_menuId_focus + "_resize"] != undefined) dd.elements[_ob_menuId_focus + "_resize"].moveTo(parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.left), parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.top));

        document.getElementById(_ob_menuId_focus + "_head").style.width = (parseInt(document.getElementById(_ob_menuId_focus).style.width) + 1) + "px";
        if (document.getElementById(_ob_menuId_focus + "_footer"))   document.getElementById(_ob_menuId_focus + "_footer").style.width = document.getElementById(_ob_menuId_focus).style.width;
        document.getElementById(_ob_menuId_focus + "_close").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_close").style.width) - 4 + "px";
        document.getElementById(_ob_menuId_focus + "_window_manager").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_window_manager").style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_close").style.width) - 8 + "px";
        if (document.getElementById(_ob_menuId_focus + "_clear"))  document.getElementById(_ob_menuId_focus + "_clear").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_window_manager").style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_close").style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_clear").style.width) - 12 + "px";
        if (_ob_menuId_focus == "ob_menu_RequestBrowser")this.resize_RequestBrowser_body();
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.move()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.resize = function (ob_menu) {
    try {
        //Resize window selected window menu
        if (ob_menu != undefined)_ob_menuId_focus = ob_menu;
        if (parseInt(document.getElementById(_ob_menuId_focus).style.width) < 90) {
            document.getElementById(_ob_menuId_focus).style.width = "90px";
            document.getElementById(_ob_menuId_focus + "_resize").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) + parseInt(document.getElementById(_ob_menuId_focus).style.left) - parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.width) + "px";
            return;
        }
        if (parseInt(document.getElementById(_ob_menuId_focus).style.height) < 115) {
            document.getElementById(_ob_menuId_focus).style.height = "115px";
            if (document.getElementById(_ob_menuId_focus + "_footer"))
                document.getElementById(_ob_menuId_focus + "_resize").style.top = parseInt(document.getElementById(_ob_menuId_focus + "_footer").style.height) + parseInt(document.getElementById(_ob_menuId_focus).style.top) - parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.height) + "px";
            else
                document.getElementById(_ob_menuId_focus + "_resize").style.top = parseInt(document.getElementById(_ob_menuId_focus).style.top) - parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.height) + "px";
            return;
        }

        document.getElementById(_ob_menuId_focus).style.width = parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.left) - parseInt(document.getElementById(_ob_menuId_focus).style.left) + parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.width) + "px";
        document.getElementById(_ob_menuId_focus).style.height = parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.top) - parseInt(document.getElementById(_ob_menuId_focus).style.top) + parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.height) + "px";
        if (dd.elements[_ob_menuId_focus] != undefined) dd.elements[_ob_menuId_focus].resizeTo(parseInt(document.getElementById(_ob_menuId_focus).style.width), parseInt(document.getElementById(_ob_menuId_focus).style.height));
        document.getElementById(_ob_menuId_focus + "_head").style.width = (parseInt(document.getElementById(_ob_menuId_focus).style.width) + 1) + "px";
        if (dd.elements[_ob_menuId_focus + "_head"] != undefined) dd.elements[_ob_menuId_focus + "_head"].resizeTo(parseInt(document.getElementById(_ob_menuId_focus + "_head").style.width), parseInt(document.getElementById(_ob_menuId_focus + "_head").style.height));
        document.getElementById(_ob_menuId_focus + "_close").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_close").style.width) - 4 + "px";
        document.getElementById(_ob_menuId_focus + "_window_manager").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_window_manager").style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_close").style.width) - 8 + "px";
        if (document.getElementById(_ob_menuId_focus + "_footer")) {
            document.getElementById(_ob_menuId_focus + "_footer").style.top = parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.top) + parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.height) + "px";
            document.getElementById(_ob_menuId_focus + "_footer").style.width = parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.left) - parseInt(document.getElementById(_ob_menuId_focus).style.left) + parseInt(document.getElementById(_ob_menuId_focus + "_resize").style.width) + "px";
        }
        if (document.getElementById(_ob_menuId_focus + "_clear")) document.getElementById(_ob_menuId_focus + "_clear").style.left = parseInt(document.getElementById(_ob_menuId_focus).style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_window_manager").style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_close").style.width) - parseInt(document.getElementById(_ob_menuId_focus + "_clear").style.width) - 12 + "px";
        if (_ob_menuId_focus == "ob_menu_RequestBrowser")this.resize_RequestBrowser_body();
        var count = 0;
        while (document.getElementById("ob_path_dir_" + count)) {
            document.getElementById("ob_path_dir_" + count).style.width = parseInt(document.getElementById(_ob_menuId_focus).style.width) - 5 + "px";
            count++;
        }
        //ob_dhtml_debug("openbexi_navigator.prototype.resize(" + _ob_menuId_focus + ")");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.resize()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.set_webPageName = function (pageName) {
    this.webPageName = pageName;
}
openbexi_navigator.prototype.reset_top_frame_message = function () {
    this.top_frame_message("Web page : " + this.webPageName + "      (project: " + this.projectName + " )", "425px");
}
openbexi_navigator.prototype.top_frame_message = function (message, position, type) {
    try {
        if (!document.getElementById("ob_top_frame_message"))return;
        if (position == null)
            document.getElementById("ob_top_frame_message").style.left = "26px";
        else
            document.getElementById("ob_top_frame_message").style.left = position;
        document.getElementById("ob_top_frame_message").childNodes[0].innerHTML = message;
        if (type == "error") {
            document.getElementById("ob_top_frame_message_img").src = "gif/error_x32.png";
            document.getElementById("ob_top_frame_message").style.color = "red";
        }
        else if (type == "warning") {
            document.getElementById("ob_top_frame_message_img").src = "gif/warning_x32.png";
            document.getElementById("ob_top_frame_message").style.color = "#F27E2C";
        }
        else if (type == "info") {
            document.getElementById("ob_top_frame_message_img").src = "gif/info_x32.png";
            document.getElementById("ob_top_frame_message").style.color = "#14850F";
        } else {
            document.getElementById("ob_top_frame_message_img").src = "gif/info_x32.png";
            document.getElementById("ob_top_frame_message").style.color = "black";
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.top_frame_message()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.reset_frame_message = function (frame, message) {
    this.frame_message(frame, message, null, null);
}
openbexi_navigator.prototype.frame_message = function (frame, message, type, position) {
    try {
        if (!document.getElementById(frame))return;
        if (position == null)
            document.getElementById(frame).style.left = "40px";
        else
            document.getElementById(frame).style.left = position;
        document.getElementById(frame).childNodes[0].innerHTML = openbexi_lang(message);
        if (type == null) {
            document.getElementById(frame + "_img").src = "";
            document.getElementById(frame).style.width = "50%";
        } else {
            document.getElementById(frame).style.width = "80%";
        }
        if (type == "error") {
            document.getElementById(frame + "_img").src = "gif/error_x32.png";
            document.getElementById(frame).style.color = "red";
        }
        else if (type == "warning") {
            document.getElementById(frame + "_img").src = "gif/warning_x32.png";
            document.getElementById(frame).style.color = "#F27E2C";
        }
        else if (type == "info") {
            document.getElementById(frame + "_img").src = "gif/info_x32.png";
            document.getElementById(frame).style.color = "#14850F";
        }
        else {
            document.getElementById(frame + "_img").src = "gif/info_x32.png";
            document.getElementById(frame).style.color = "black";
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.frame_message()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.drop_widget = function (event, widget, path, filename) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.drop_widget(" + event + "," + widget + "," + path + "," + filename + ")", "Info: css_mode=" + this.css_mode);

        if (this.css_mode == "backgroundImage") {
            var div_id = "";
            try {
                div_id = getSelectedBexiObj(null).div.id;
                openbexi_save_background(null, div_id, path, filename, null);
            } catch (e) {
                openbexi_save_background(null, "null", path, filename, null);
            }
            return;
        }

        var y1 = parseInt(document.getElementById(_ob_menuId_focus).style.top);
        var x1 = parseInt(document.getElementById(_ob_menuId_focus).style.left);
        var y2 = parseInt(document.getElementById(_ob_menuId_focus).style.top) + parseInt(document.getElementById(_ob_menuId_focus).style.height);
        var x2 = parseInt(document.getElementById(_ob_menuId_focus).style.left) + parseInt(document.getElementById(_ob_menuId_focus).style.width);

        var mouseX = getMouseX(event);
        var mouseY = getMouseY(event);

        __openbexi_debugC("openbexi_navigator.prototype.drop_widget()", "Info:mouseX=" + mouseX + " mouseY=" + mouseY + "  ---  x1=" + x1 + " y1=" + y1 + " x2=" + x2 + " y2=" + y2);

        if ((parseInt(mouseX) > x1 && parseInt(mouseX) < x2) && (parseInt(mouseY) > y1 && parseInt(mouseY) < y2))return;

        // if openbexi_page, openbexi_form, openbexi_fisheye or openbexi_tabber selected then drop the selected widget inside
        if (getSelectedBexiObj(null).type == "openbexi_page" || getSelectedBexiObj(null).type == "openbexi_form" || getSelectedBexiObj(null).type == "openbexi_fisheye" || getSelectedBexiObj(null).type == "openbexi_tabber") {
            mouseY = (parseInt(mouseY) - parseInt(getSelectedBexiObj(null).div.style.top)) + "px";
            mouseX = (parseInt(mouseX) - parseInt(getSelectedBexiObj(null).div.style.left)) + "px";
        }

        if (widget == "link")
            add_HTMLLink(null, mouseX, mouseY, "vertical");
        else if (widget == "img")
            add_HTMLImg(null, "gif/no-photo.jpg", null, null, true, mouseX, mouseY, "gifPlus", filename, "vertical");
        else if (widget == "media")
            add_HTMLMedia(null, "gif/ob_video_x32.png", mouseX, mouseY, "video", filename);
        else if (widget == "button")
            add_HTMLButton(null, null, mouseX, mouseY, "vertical");
        else if (widget == "text_edit")
            add_dojo_editor(null, null, mouseX, mouseY, "vertical");
        else if (widget == "copyright")
            add_dojo_editor(null, "copyright", mouseX, mouseY, "vertical");
        else if (widget == "page") {
            if (getSelectedBexiObj(null) == openbexiBody)
                add_HTMLPage(null, mouseX, mouseY);
            else
                add_HTMLPage(getSelectedBexiObj(null), mouseX, mouseY);
        }
        else if (widget == "box")
            add_HTMLDiv(null, mouseX, mouseY, "box", "vertical");
        else if (widget == "relative_page")
            add_HTMLRelativePage(null, null, "vertical");
        else if (widget == "list")
            add_HTMLList(null, mouseX, mouseY, "vertical");
        else if (widget == "tree")
            add_HTMLTree(null, mouseX, mouseY, "vertical");
        else if (widget == "chartFlow")
            if (getSelectedBexiObj(null) == openbexiBody)
                add_HTMLChartFlow(null, mouseX, mouseY, "vertical");
            else
                add_HTMLChartFlow(getSelectedBexiObj(null), mouseX, mouseY, "vertical");
        else if (widget == "calendar")
            add_HTMLCalendar(null, mouseX, mouseY, "vertical");
        else if (widget == "clock")
            add_HTMLClock(null, mouseX, mouseY, "vertical");
        else if (widget == "fisheye")
            add_HTMLFisheye(null, mouseX, mouseY, "vertical");
        else if (widget == "form")
            add_HTMLForm(null, mouseX, mouseY, "vertical");
        else if (widget == "chartPie")
            add_HTMLChart("pie", null, null, null, null, null, mouseX, mouseY, "vertical");
        else if (widget == "chartBar")
            add_HTMLChart("bar", null, null, null, null, null, mouseX, mouseY, "vertical");
        else if (widget == "chartLine")
            add_HTMLChart("line", null, null, null, null, null, mouseX, mouseY, "vertical");
        else if (widget == "dygraphs")
            add_HTMLDygraphs("dygraphs", null, null, null, null, null, mouseX, mouseY, "vertical");
        else if (widget == "simile")
            add_HTMLTimeline(null, mouseX, mouseY, "vertical");
        else if (widget == "grid")
            add_HTMLDojo(null, 'dojox.grid.Grid', 'Grid/Table', null, null, null, null, "vertical");
        else if (widget == "gridx")
            add_HTMLDojo(null, 'GridX', 'Grid/Table', null, null, null, null, "vertical");
        else if (widget == "checkBox")
            add_HTMLDojo(null, 'dijit.form.CheckBox', 'CheckBox', null, null, null, null, "vertical");
        else if (widget == "textbox")
            add_HTMLDojo(null, 'dijit.form.TextBox', 'TextBox', null, null, null, null, "vertical");
        else if (widget == "comboBox")
            add_HTMLDojo(null, 'dijit.form.ComboBox', 'ComboBox', null, null, null, null, "vertical");
        else if (widget == "currencyTextBox")
            add_HTMLDojo(null, 'dijit.form.CurrencyTextBox', 'CurrencyTextBox', null, null, null, null, "vertical");
        else if (widget == "validationTextBox")
            add_HTMLDojo(null, 'dijit.form.ValidationTextBox', 'ValidationTextBox', null, null, null, null, "vertical");
        else if (widget == "dateTextBox")
            add_HTMLDojo(null, 'dijit.form.DateTextBox', 'DateTextBox', null, null, null, null, "vertical");
        else if (widget == "integer")
            add_HTMLDojo(null, 'dijit.form.NumberTextBox', 'Integer', null, null, null, null, "vertical");
        else if (widget == "UsZip")
            add_HTMLDojo(null, 'dijit.form.ValidationTextBox', 'UsZip', null, null, null, null, "vertical");
        else if (widget == "url")
            add_HTMLDojo(null, 'dijit.form.ValidationTextBox', 'url', null, null, null, null, "vertical");
        else if (widget == "image")
            add_HTMLDojo(null, 'dijit.form.ValidationTextBox', 'url', null, null, null, null, "vertical");
        else if (widget == "password")
            add_HTMLDojo(null, 'dijit.form.TextBox', 'Password', null, null, null, null, "vertical");
        else
            __openbexi_debugC("openbexi_navigator.prototype.drop_widget()", "Warning:" + widget + " not implemented");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.drop_widget()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.set_widget = function () {
    try {
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.set_widget()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.log_on = function (event) {
    openbexi_stopEventPropagation(event);
    if (document.getElementById("ob_frame_top_img0") != null)
        document.getElementById("ob_frame_top_img0").src = "gif/info_on_x32.png";
    this.top_frame_message("Display log window", "40px");
}
openbexi_navigator.prototype.log_up = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        openbexi_debugging = 1;
        if (document.getElementById("ob_menu_debugging_head") != null) {
            this.window_factory(event, 'ob_menu_debugging', null, 'maximize');
        }
        if (document.getElementById("ob_frame_top_img0") != null)
            document.getElementById("ob_frame_top_img0").src = "gif/info_x32.png";
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.log_up()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.openbexi_close_up = function () {
    try {
        document.getElementById("ob_frame_top_img1").src = "gif/shutdown_x32.png";
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.openbexi_close_up()", "Exception:" + e.message);
    }
}
//###################################################################
//PICTURE
function openbexi_browse_picture_gallery_CB(responseXML) {
    //alert(responseXML);
    try {
        __openbexi_debugC("openbexi_browse_picture_gallery_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_browse_picture_gallery_CB bug ???");
            __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }

        // Do nothing if the job has not been done in time.
        //if (openbexiNavigator && openbexiNavigator.working == false){
        //openbexi_unloading2();
        //return;
        //}

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_browse_picture_gallery_CB() Info:", "status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_browse_picture_gallery_CB() Info:", "appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception:", exception);

        var objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");
        if (objectMaxCount == "") {
            objectMaxCount = openbexiNavigator.maxMediaItems;
            __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception:", "no objectMaxCount found");
        }

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        var ob_end = 0;
        if (file_count == "") __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception:", "no file_count found");
        else
            ob_end = parseInt(file_count);

        var dir_name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "dirname");
        if (dir_name == "") __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception:", "no directory name found");
        var action = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "action", "type");
        if (action == "") __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception:", "no action found");

        var parent_path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "parent");
        var parent = "";
        if (parent_path == "")
            __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception::", "no parent found");
        else
            parent = openbexi_removePath(parent_path, false);
        var items = parent_path.split("\\");
        if (items.length == 1) items = parent_path.split("\/");
        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") {
            path = null;
            __openbexi_debugC("openbexi_browse_picture_gallery_CB() Info:", "no project path found");
        }
        openbexiNavigator.browse_picture_path = path;

        var dir_up = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dirUp", "path");
        if (dir_up == "") {
            dir_up = "ok";
            __openbexi_debugC("openbexi_browse_picture_gallery_CB() Exception::", "no directory up found");
        }
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        if (subtype == "") __openbexi_debugC("openbexi_browse_picture_gallery_CB() Info:", "no subtype found");
        var name;
        var typefile;
        var icon;
        var count = 0;

        ob_menu_pictures = new Array();
        ob_menu_pictures[count] = new Array();
        ob_menu_pictures[count][0] = "path";
        ob_menu_pictures[count][1] = "ob_menu_PictureBrowser_" + count;
        ob_menu_pictures[count][2] = "";
        ob_menu_pictures[count][3] = "";
        ob_menu_pictures[count][4] = "";
        ob_menu_pictures[count][5] = "";
        ob_menu_pictures[count][6] = "";
        ob_menu_pictures[count][7] = "";
        ob_menu_pictures[count][8] = parent_path;
        ob_menu_pictures[count][9] = "";
        ob_menu_pictures[count][10] = "";
        ob_menu_pictures[count][11] = "";
        ob_menu_pictures[count][12] = "";
        count++;

        if (dir_up == "ok") {
            ob_menu_pictures[count] = new Array();
            ob_menu_pictures[count][0] = "gallery";
            ob_menu_pictures[count][1] = "ob_menu_PictureBrowser_" + count;
            ob_menu_pictures[count][2] = "openbexiNavigator.browse_picture('" + "images" + "',\'dir_up\',undefined,\'gallery\',true,false)";
            ob_menu_pictures[count][3] = "";
            ob_menu_pictures[count][4] = "";
            ob_menu_pictures[count][5] = "";
            ob_menu_pictures[count][6] = "";
            ob_menu_pictures[count][7] = "up";
            ob_menu_pictures[count][8] = "gif/ob_folder_up_x48.png";
            ob_menu_pictures[count][9] = "50px";
            ob_menu_pictures[count][10] = "50px";
            ob_menu_pictures[count][11] = "cursor:pointer;";
            ob_menu_pictures[count][12] = "";
            count++;
        }
        for (var j = 0; j < ob_end; j++) {
            try {
                ob_menu_pictures[count] = new Array();
                name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                typefile = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "type");
                // Set ob_menu_pictures
                ob_menu_pictures[count][0] = "gallery";
                ob_menu_pictures[count][1] = "ob_menu_PictureBrowser_" + count;
                if (typefile == "dir") {
                    ob_menu_pictures[count][2] = "openbexiNavigator.browse_picture('" + openbexi_system.openbexi_stringReplaceAll(name, " ", "-##-") + "',\'dir\',undefined,\'gallery\',true,false)";
                    ob_menu_pictures[count][3] = "";
                    ob_menu_pictures[count][8] = "gif/folder_yellow.png";
                    ob_menu_pictures[count][11] = "cursor:pointer;";
                } else {
                    ob_menu_pictures[count][2] = "";
                    icon = ob_getIcon(name, "media").replace("_icon", "_x48.png");
                    if (icon == name) {
                        if (action == "video") {
                            ob_menu_pictures[count][3] = "openbexiNavigator.drop_widget(event,\'media\',\'video/\',\'" + name + "\')";
                            ob_menu_pictures[count][8] = "gifPlus/" + name;
                        }
                        else {
                            //ob_menu_pictures[count][3] = "openbexiNavigator.drop_widget(event,\'img\','" + "gifPlus/," + name + "')";
                            ob_menu_pictures[count][3] = "openbexiNavigator.drop_widget(event,\'img\',\'gifPlus/\',\'" + name + "\')";
                            ob_menu_pictures[count][8] = "gifPlus/" + name;
                        }
                        ob_menu_pictures[count][11] = "";
                    }
                    else {
                        ob_menu_pictures[count][2] = "alert(\'Cannot process this file ...\')";
                        ob_menu_pictures[count][8] = "gif/" + icon;
                        ob_menu_pictures[count][11] = "cursor:pointer;";
                    }
                }
                ob_menu_pictures[count][4] = "";
                ob_menu_pictures[count][5] = "";
                ob_menu_pictures[count][6] = "";
                ob_menu_pictures[count][7] = name;
                ob_menu_pictures[count][9] = "50px";
                ob_menu_pictures[count][10] = "50px";
                ob_menu_pictures[count][12] = "";
                count++;
            } catch (e1) {
                __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_picture_gallery_CB()", "Exception:" + e1.message);
            }
        }
        if (parseInt(file_count) == 0) {
            ob_menu_pictures[count] = new Array();
            ob_menu_pictures[count][0] = "gallery";
            ob_menu_pictures[count][1] = "ob_menu_PictureBrowser_" + count;
            ob_menu_pictures[count][2] = "openbexiNavigator.browse_picture('" + "images" + "',\'dir_up\',undefined,\'gallery\',true,false)";
            ob_menu_pictures[count][3] = "";
            ob_menu_pictures[count][4] = "";
            ob_menu_pictures[count][5] = "";
            ob_menu_pictures[count][6] = "";
            ob_menu_pictures[count][7] = "no_media_found ...";
            ob_menu_pictures[count][8] = "gif/ob_file_x48.png";
            ob_menu_pictures[count][9] = "50px";
            ob_menu_pictures[count][10] = "50px";
            ob_menu_pictures[count][11] = "cursor:pointer;";
            ob_menu_pictures[count][12] = "";
        }
        openbexiNavigator.build_window_body("ob_menu_PictureBrowser", null, ob_menu_pictures, true);
        if (openbexiNavigator.ob_menu_PictureBrowser_pager != null) {
            openbexiNavigator.ob_menu_PictureBrowser_pager.display();
            openbexiNavigator.ob_menu_PictureBrowser_pager.setup(ob_doc);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_browse_picture_gallery_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

var _ob_picture_current_path_text = "";

function openbexi_browse_picture_tree_CB(responseXML) {
    // alert(responseXML);
    try {
        __openbexi_debugC("openbexi_browse_picture_tree_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_browse_picture_tree_CB bug ???");
            __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }

        // Do nothing if the job has not been done in time.
        //if (openbexiNavigator && openbexiNavigator.working == false){
        //openbexi_unloading2();
        //return;
        //}

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_browse_picture_tree_CB() Info:", "status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_browse_picture_tree_CB() Info:", "appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception:", exception);

        var objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");
        if (objectMaxCount == "") {
            objectMaxCount = openbexiNavigator.maxMediaItems;
            __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception:", "no objectMaxCount found");
        }

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        var ob_end = 0;
        if (file_count == "") __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception:", "no file_count found");
        else
            ob_end = parseInt(file_count);

        var dir_name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "dirname");
        if (dir_name == "") __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception:", "no directory name found");
        var action = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "action", "type");
        if (action == "") __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception:", "no action found");

        var parent_path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "parent");
        var parent = "";
        if (parent_path == "")
            __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception::", "no parent found");
        else
            parent = openbexi_removePath(parent_path, false);
        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") {
            path = null;
            __openbexi_debugC("openbexi_browse_picture_tree_CB() Info:", "no project path found");
        }
        var source_path2 = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "source_path");
        if (source_path2 == "")
            __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception::", "no source_path found");
        openbexiNavigator.browse_picture_path = path;
        var source_path = openbexi_system.openbexi_stringReplaceAll(source_path2, " ", "-##-");

        var dir_up = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dirUp", "path");
        if (dir_up == "") {
            dir_up = "ok";
            __openbexi_debugC("openbexi_browse_picture_tree_CB() Exception::", "no directory up found");
        }
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        if (subtype == "") __openbexi_debugC("openbexi_browse_picture_tree_CB() Info:", "no subtype found");

        var new_file_tree = "[\n";
        var items = path.split("\\");
        if (items.length == 1) items = path.split("\/");
        if (items.length != 0) {
            new_file_tree += " {\n";
            new_file_tree += " label: '";
            var new_path = "";
            for (var p = 0; p < items.length; p++) {
                if (p == 0 && items[p] == "")
                    new_path = "\/";
                if (items[p] != ".." && items[p] != "") {
                    if (p < items.length - 1) {
                        new_path += items[p] + "\/";
                        new_file_tree += '<a onmouseover=openbexi_set_CSS(this,\"background:url(gif/fading_background_yellow_600x32.png);cursor:pointer;\") onmouseout=openbexi_set_CSS(this,\"background:;cursor:;\") onclick=openbexiNavigator.browse_picture(\"' + "" + '\",\"dir\",\"' + openbexi_system.openbexi_stringReplaceAll(new_path, " ", "-##-") + '\",\"tree\",true,false) >' + items[p] + '/</a>';
                    } else {
                        new_path += items[p];
                        new_file_tree += '<a onmouseover=openbexi_set_CSS(this,\"background:url(gif/fading_background_yellow_600x32.png);cursor:pointer;\") onmouseout=openbexi_set_CSS(this,\"background:;cursor:;\") onclick=openbexiNavigator.browse_picture(\"' + "" + '\",\"dir\",\"' + openbexi_system.openbexi_stringReplaceAll(new_path, " ", "-##-") + '\",\"tree\",true,false) >' + items[p] + '</a>';
                    }
                }
            }
            new_file_tree += "',\n";
            new_file_tree += " id: '" + "ob_root_path" + "',\n";
            new_file_tree += " dir: '" + "dir_path" + "',\n";
            new_file_tree += " status: '" + "none" + "',\n";
            new_file_tree += " },\n";
        }
        _ob_picture_current_path_text = path;
        var count = 0;
        ob_menu_pictures = new Array();
        ob_menu_pictures[count] = new Array();
        ob_menu_pictures[count][0] = "path";
        ob_menu_pictures[count][1] = "ob_menu_PictureBrowser_" + count;
        ob_menu_pictures[count][2] = "";
        ob_menu_pictures[count][3] = "";
        ob_menu_pictures[count][4] = "";
        ob_menu_pictures[count][5] = "";
        ob_menu_pictures[count][6] = "";
        ob_menu_pictures[count][7] = "";
        ob_menu_pictures[count][8] = path;
        ob_menu_pictures[count][9] = "";
        ob_menu_pictures[count][10] = "";
        ob_menu_pictures[count][11] = "";
        ob_menu_pictures[count][12] = "";
        count++;

        if (dir_up == "ok") {
            new_file_tree += " {\n";
            new_file_tree += " label: '" + '<a  onclick=openbexiNavigator.browse_picture(\"images\",\"dir_up\",undefined,\"tree\",true,false) >' + "up" + '</a>' + "',\n";
            new_file_tree += " id: '" + "ob_folder_up" + "',\n";
            new_file_tree += " dir: '" + "up" + "',\n";
            new_file_tree += " status: '" + "none" + "',\n";
            new_file_tree += " },\n";

            ob_menu_pictures[count] = new Array();
            ob_menu_pictures[count][0] = "gallery";
            ob_menu_pictures[count][1] = "ob_menu_PictureBrowser_" + count;
            ob_menu_pictures[count][2] = "openbexiNavigator.browse_picture('" + "images" + "',\'dir_up\',undefined,\'gallery\',true,false,false)";
            ob_menu_pictures[count][3] = "";
            ob_menu_pictures[count][4] = "";
            ob_menu_pictures[count][5] = "";
            ob_menu_pictures[count][6] = "";
            ob_menu_pictures[count][7] = "up";
            ob_menu_pictures[count][8] = "gif/ob_folder_up_x48.png";
            ob_menu_pictures[count][9] = "50px";
            ob_menu_pictures[count][10] = "50px";
            ob_menu_pictures[count][11] = "cursor:pointer;";
            ob_menu_pictures[count][12] = "";
            count++;
        }
        if (parseInt(file_count) > 0) {
            var name;
            var typefile;
            for (var j = 0; j < ob_end; j++) {
                try {
                    name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                    typefile = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "type");
                    var icon = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "icon");
                    // Note: Replacing all blanck by -##- to fix DOJO tree issue
                    if (typefile == "dir")
                        new_file_tree += " { label: '" + '<a  onclick=openbexiNavigator.browse_picture(\"' + openbexi_system.openbexi_stringReplaceAll(name, " ", "-##-") + '\",\"dir\",undefined,\"tree\",true,false) >' + name + '</a>' + "', id: 'ob_close_folder" + j + "' , dir_web_page_name: '" + name + "', status: '" + "none" + "'},\n";
                    else if (action == "video")
                        new_file_tree += " { label: '" + '<a  onclick=openbexi_save_media(null,\"' + source_path + '\",\"' + openbexi_system.openbexi_stringReplaceAll(name, " ", "-##-") + '\",null)>' + name + '</a>' + "', id: '" + name + "' , dir_web_page_name: '" + name + "', status: 'none'},\n";
                    else if (openbexiNavigator.css_mode == "backgroundImage")
                        new_file_tree += " { label: '" + '<a  onclick=openbexi_save_background(null,null,\"' + source_path + '\",\"' + openbexi_system.openbexi_stringReplaceAll(name, " ", "-##-") + '\",null) >' + name + '</a>' + "', id: '" + name + "' , dir_web_page_name: '" + name + "', status: 'none'},\n";
                    else
                        new_file_tree += " { label: '" + '<a  onclick=add_HTMLImg(null,\"' + "gif/no-photo.jpg" + '\",null,null,true,null,0,\"' + source_path + '\",\"' + openbexi_system.openbexi_stringReplaceAll(name, " ", "-##-") + '\") >' + name + '</a>' + "', id: '" + name + "' , dir_web_page_name: '" + name + "', status: 'none'},\n";

                    // Set ob_menu_pictures
                    ob_menu_pictures[count] = new Array();
                    ob_menu_pictures[count][0] = "gallery";
                    ob_menu_pictures[count][1] = "ob_menu_PictureBrowser_" + count;
                    if (typefile == "dir") {
                        ob_menu_pictures[count][2] = "openbexiNavigator.browse_picture('" + openbexi_system.openbexi_stringReplaceAll(name, " ", "-##-") + "',\'dir\',undefined,\'gallery\',true,false)";
                        ob_menu_pictures[count][3] = "";
                        ob_menu_pictures[count][8] = "gif/folder_yellow.png";
                        ob_menu_pictures[count][11] = "cursor:pointer;";
                    } else {
                        ob_menu_pictures[count][2] = "";
                        icon = ob_getIcon(name, "media").replace("_icon", "_x48.png");
                        if (icon == name) {
                            if (action == "video") {
                                ob_menu_pictures[count][3] = "openbexiNavigator.drop_widget(event,\'media\',\'video/\',\'" + name + "\')";
                                ob_menu_pictures[count][8] = "gifPlus/" + name;
                            } else {
                                ob_menu_pictures[count][3] = "openbexiNavigator.drop_widget(event,\'img\',\'gifPlus/\',\'" + name + "\')";
                                ob_menu_pictures[count][8] = "gifPlus/" + name;
                            }
                            ob_menu_pictures[count][11] = "";
                        }
                        else {
                            ob_menu_pictures[count][2] = "alert(\'Cannot process this file ...\')";
                            ob_menu_pictures[count][8] = "gif/" + icon;
                            ob_menu_pictures[count][11] = "cursor:pointer;";
                        }
                    }
                    ob_menu_pictures[count][4] = "";
                    ob_menu_pictures[count][5] = "";
                    ob_menu_pictures[count][6] = "";
                    ob_menu_pictures[count][7] = name;
                    ob_menu_pictures[count][9] = "50px";
                    ob_menu_pictures[count][10] = "50px";
                    ob_menu_pictures[count][12] = "";
                    count++;
                } catch (e1) {
                    __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_picture_tree_CB()", "Exception:" + e1.message);
                }
            }
        } else {
            new_file_tree += " {\n";
            new_file_tree += " label: '" + '<a  onclick=openbexiNavigator.browse_picture(\"images\",\"dir_up\",\"\",\"\",true,false) >' + "no media" + '</a>' + "',\n";
            new_file_tree += " id: '" + "ob_no_media" + "',\n";
            new_file_tree += " dir: '" + "ob_no_media" + "',\n";
            new_file_tree += " status: '" + "none" + "',\n";
            new_file_tree += " },\n";
        }
        new_file_tree += "];";
        openbexiNavigator.PictureBrowser_json_tree = eval(new_file_tree);
        if (document.getElementById("ob_menu_PictureBrowser_window_manager_img").src.match(RegExp("full"))) {
            openbexiNavigator.create_tree("rawdata", openbexiNavigator.PictureBrowser_json_tree, "ob_menu_PictureBrowser_sub", null, null, undefined, undefined);
        }

        if (openbexiNavigator.ob_menu_PictureBrowser_pager != null) {
            openbexiNavigator.ob_menu_PictureBrowser_pager.display();
            openbexiNavigator.ob_menu_PictureBrowser_pager.setup(ob_doc);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_browse_picture_tree_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

openbexi_navigator.prototype.browse_picture = function (name, action, path, type, reset_pager, reset_filter) {
    try {
        if (openbexiNavigator.working) {
            __openbexi_debugC("openbexi_navigator.prototype.browse_picture(" + name + ")", "Info:Canceled");
            return;
        }
        __openbexi_debugC("openbexi_navigator.prototype.browse_picture(" + name + ")", "Info:");
        _ob_picture_current_path_text = path;
        this.set_menu_focus("ob_menu_PictureBrowser");
        this.set_mode("projects");
        this.sub_mode = "webPages";
        // Note: Replacing all blanck by -##- to fix an issue
        if (path != undefined)this.browse_picture_path = openbexi_system.openbexi_stringReplaceAll(path, "-##-", " ");
        name = openbexi_system.openbexi_stringReplaceAll(name, "-##-", " ");

        if (type == "tree") {
            openbexiNavigator.dhtml_set_up(null, document.getElementById('ob_menu_PictureBrowser_head'), 'ob_menu_PictureBrowser');
            openbexiNavigator.window_factory(null, 'ob_menu_PictureBrowser', null, 'minimize');
        }

        var doc = null;
        var filter = document.getElementById("ob_menu_PictureBrowser_inputTypefilter").value;
        var label = document.getElementById("ob_menu_PictureBrowser_inputfilter").value;
        if (reset_filter) {
            label = "";
            if (name == "video")
                filter = "swf|wmv|avi|mpeg|mpg|mpe|movie|mov|qt|avi|AVI|MEPG|MPG|MPE|MOVIE|MOV|QT|AVI";
            else
                filter = "gif|png|jpeg|jpg|tiff|riff|bgi|bmp|svg|GIF|PNG|JPEG|JPG|TIFF|RIFF|BGI|BMP|SVG";
        }
        if (reset_pager) {
            openbexiNavigator.ob_menu_PictureBrowser_pager.posCurrentItem = 0;
            openbexiNavigator.ob_menu_PictureBrowser_pager.pager_number = 0;
        }
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "local");
        var dir_filter = document.getElementById("ob_menu_PictureBrowser_inputfilter").value;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", dir_filter);
        var file_filter = document.getElementById("ob_menu_PictureBrowser_inputTypefilter").value;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", file_filter);
        if (name == "images" || "background") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "action", "type", "image");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", name);
            if (document.getElementById("ob_menu_PictureBrowser_inputTypefilter")) document.getElementById("ob_menu_PictureBrowser_inputTypefilter").value = filter;
            if (document.getElementById("ob_menu_PictureBrowser_inputfilter")) document.getElementById("ob_menu_PictureBrowser_inputfilter").value = label;
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", filter);
        }
        if (name == "video") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "action", "type", "video");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "video");
            if (document.getElementById("ob_menu_PictureBrowser_inputTypefilter")) document.getElementById("ob_menu_PictureBrowser_inputTypefilter").value = filter;
            if (document.getElementById("ob_menu_PictureBrowser_labelfilter")) document.getElementById("ob_menu_PictureBrowser_labelfilter").value = label;
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", filter);
        }
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", action);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxMediaItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", openbexiNavigator.ob_menu_PictureBrowser_pager.posCurrentItem);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", openbexiNavigator.ob_menu_PictureBrowser_pager.pager_number);
        if (action == "none") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", this.browse_picture_path);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        } else {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", this.browse_picture_path);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", name);
        }

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        if (type == "tree") {
            var count_dir = 1;
            while (eval(openbexiNavigator.PictureBrowser_json_tree)[count_dir] != undefined) {
                openbexiNavigator.PictureBrowser_json_tree[count_dir].status = "loading";
                count_dir++;
            }
            openbexiNavigator.create_tree("rawdata", openbexiNavigator.PictureBrowser_json_tree, "ob_menu_PictureBrowser_sub", null, null, true, undefined);
            openbexiNavigator.load_timeout = 30000;
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_picture_tree_CB, "ob_menu_PictureBrowser_head", "Browsing image ...");
        } else {
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_picture_gallery_CB, "ob_menu_PictureBrowser_head", "Browsing image ...");
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.browse_picture()", "Exception:" + e.message);
    }
}
//###################################################################
//TEMPLATE
openbexi_navigator.prototype.open_web_template_page = function (category, webPage, newTemplate) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_web_template_page(" + category + "," + webPage + ")", "Info:");

        //if (this.FileBrowser_tree_first_start == true && category == this.projectName && webPage == this.HTML_pageName) return;
        if (dirty_flag) {
            this.New_projectName = category;
            this.New_HTML_pageName = webPage;
            ob_savePage.ob_state.html = '<label>Saving the current template page for the project ' + this.projectName + '.</label><br />' +
                    '<b><label class="ob_label">Project/label></b><input class="ob_textarea" id="ob_savePage_Project" type="text" name="ob_savePage_Project" readonly size="40" value="' + openbexiNavigator.projectName + '"><br />' +
                    '<b><label class="ob_label">Template:</label></b><input class="ob_textarea" id="ob_savePage_WEB_page" type="text" name="ob_savePage_WEB_page" readonly size="40" value="' + openbexiNavigator.HTML_pageName + '">' +
                    '</label><br /><br />' + 'Do you want to save  "<b>' + this.HTML_pageName + '</b>"  before opening "<b>' + webPage + '( project:' + category + ')</b>"?</label><br />';
            openbexiNavigator.prompt(null, ob_savePage);
            ob_setDirty_flag(false);
            return;
        }
        this.New_projectName = "";
        this.New_HTML_pageName = "";
        this.HTML_pageName = webPage;
        this.projectName = category;
        this.templateCategory = category;
        openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);
        openbexi_updateWebPrivateData(null, "bexicontext", "ob_navigator", "mode", "ob_template");

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_openTemplateHTMLPagesRequest");
        if (newTemplate == true)
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openNewTemplateHTMLPages");
        else
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openTemplateHTMLPages");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", webPage);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "template", webPage);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", "template");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "ob_project");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.templateCategory);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_open_web_page_project_CB, "ob_menu_FileBrowser_head", "Opening template ...");
    } catch (e) {
        __openbexi_debugC("open_web_template_page()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.get_web_template_page = function (webPage) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.get_web_template_page(" + webPage + ")", "Info:");
        this.HTML_pageName = webPage;
        this.templateCategory = webPage;
        openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);
        openbexi_updateWebPrivateData(null, "bexicontext", "ob_navigator", "mode", "ob_template");

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webPageTemplates");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", webPage);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", "template");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "ob_project");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_CSS_CB, "ob_menu_FileBrowser_head", "Browsing template ...");
    } catch (e) {
        __openbexi_debugC("get_web_template_page()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.update_css_editor_mode = function (event, mode) {
    this.css_editor_mode = mode;
}
openbexi_navigator.prototype.get_css_editor_mode = function (event, mode) {
    return this.css_editor_mode;
}
function openbexi_browse_CSS_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_browse_CSS_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_browse_CSS_CB bug ???");
            __openbexi_debugC("openbexi_browse_CSS_CB() Exception:", "No answer from the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var cssStyle = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "cssStyle");
        if (cssStyle == "") cssStyle = "ob_template_style";
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        var templateCategory = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "templateCategory");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_browse_CSS_CB() Info:", "status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_browse_CSS_CB() Info:", "appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_browse_CSS_CB() Exception:", exception);

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (file_count == "") __openbexi_debugC("openbexi_browse_CSS_CB() Info:", "no project found");
        var ob_end = parseInt(file_count);

        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") __openbexi_debugC("openbexi_browse_CSS_CB() Info:", "no project path found");
        openbexiNavigator.path = path;

        var count_template = 0;
        var new_file_tree = "";
        var show_template = true;
        if (getSelectedBexiObj(null).type == "openbexi_body" && dirty_flag) show_template = false;
        //alert(getSelectedBexiObj(null).type+"\ndirty_flag="+dirty_flag+"\nshow_template="+show_template)
        while (openbexiNavigator.ob_CSS_json_tree[count_template] != undefined) count_template++;
        new_file_tree = "[\n";
        for (var i = 0; i < count_template; i++) {

            var label = openbexiNavigator.ob_CSS_json_tree[i].label;
            var id = openbexiNavigator.ob_CSS_json_tree[i].id;
            status = openbexiNavigator.ob_CSS_json_tree[i].status;
            new_file_tree += " {\n";
            new_file_tree += " label: '" + label + "',\n";
            new_file_tree += " id: '" + id + "',\n";
            new_file_tree += " status: '" + status + "',\n";
            if (show_template && openbexiNavigator.ob_CSS_json_tree[i].id == "ob_template_style") {
                new_file_tree += " children: [\n";
                //if (subtype == "webPageTemplates")
                //new_file_tree += " { label: '" + '<b  style="cursor:default;" >' + templateCategory + '</b>' + "', id: '" + "ob_template_" + templateCategory + "" + "' , status: '" + "__TEMPLATE" + "',children: [\n";
                for (var j = 0; j < ob_end; j++) {
                    try {
                        var name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                        var type = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "type");
                        if (subtype == "webPageTemplates")
                            new_file_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=getSelectedBexiObj(null).set_template(\"' + name.replace("\.js", "") + '\",\"' + templateCategory + '\",\"open\",' + true + ');>' + name + '</a>' + "', id: '" + j + name + "" + "' , status: '" + "none" + "'},\n";
                        else if (name != "images") {
                            if (type == "dir" && subtype == "templates")
                                new_file_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=getSelectedBexiObj(null).set_template(\"' + name + '\",\"' + name + '\",\"open\",true);>' + name + '</a>' + "', id: '" + "ob_dirtemplate_" + name + "" + "' , status: '" + "__TEMPLATE" + "'},\n";
                            else
                                new_file_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=getSelectedBexiObj(null).set_template(\"' + name + '\",\"' + name.replace("\.js", "") + '\",\"get\");>' + name + '</a>' + "', id: '" + "ob_template_" + name + "" + "' , status: '" + "__TEMPLATE" + "'},\n";
                        }
                    } catch (e1) {
                        __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_CSS_CB()", "Exception:" + e1.message);
                    }
                }
                //if (subtype == "webPageTemplates")
                //new_file_tree += " ]},\n";

                if (ob_end == 0) {
                    new_file_tree += " { label: '" + '<a style="  style="cursor:pointer;" >' + "No template available" + '</a>' + "', id: 'ob_template_NO' ,  status: '" + "none" + "'},\n";
                }
                new_file_tree += " ]\n";
            } else {
                var count_template_web_page = 0;
                while (openbexiNavigator.ob_CSS_json_tree[i].children[count_template_web_page] != undefined) count_template_web_page++;
                new_file_tree += " children: [\n";
                for (var l = 0; l < count_template_web_page; l++) {
                    var label_child = openbexiNavigator.ob_CSS_json_tree[i].children[l].label;
                    var id_child = openbexiNavigator.ob_CSS_json_tree[i].children[l].id;
                    var status_child = openbexiNavigator.ob_CSS_json_tree[i].children[l].status;
                    new_file_tree += " { label: '" + label_child + "', id: '" + id_child + l + "' , status: '" + status_child + "'},\n";
                }
                new_file_tree += " ]\n";
            }

            if (i != count_template - 1)
                new_file_tree += " },\n";
            else
                new_file_tree += " }\n";
        }

        new_file_tree += "];";
        openbexiNavigator.create_tree("rawdata", eval(new_file_tree), "ob_menu_CSS_sub", null, true, undefined, cssStyle);
        ob_save_CSSPickers(getSelectedBexiObj(null).type, new_file_tree);

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_CSS_CB()", "Exception: " + e.message);
    }
    openbexi_unloading2();
}

function openbexi_browse_CSS_chartFlow_endpoint_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_browse_CSS_chartFlow_endpoint_CB(" + responseXML + ")", "Info:");
        openbexiNavigator.create_tree("rawdata", ob_endpoint_json_tree, "ob_menu_CSS_sub", null, true, undefined, "ob_more_style.CSS");
        openbexi_unloading2();
    } catch (e) {
        __openbexi_debugC("openbexi_browse_CSS_chartFlow_endpoint_CB()", "Exception:" + e.message);
    }
}

function openbexi_browse_CSS_chartFlow_connector_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_browse_CSS_chartFlow_connector_CB(" + responseXML + ")", "Info:");
        openbexiNavigator.create_tree("rawdata", ob_connector_json_tree, "ob_menu_CSS_sub", null, true, undefined, "ob_more_style.CSS");
        openbexi_unloading2();
    } catch (e) {
        __openbexi_debugC("openbexi_browse_CSS_chartFlow_connector_CB()", "Exception:" + e.message);
    }
}

function openbexi_browse_CSS_editor_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_browse_CSS_editor_CB(" + responseXML + ")", "Info:");
        openbexiNavigator.create_tree("rawdata", openbexiNavigator.ob_CSS_editor_json_tree, "ob_menu_CSS_sub", null, true, undefined, "ob_more_style.CSS");
        openbexi_unloading2();
    } catch (e) {
        __openbexi_debugC("openbexi_browse_CSS_editor_CB()", "Exception:" + e.message);
    }
}


openbexi_navigator.prototype.browse_CSS = function (event, cssStyle, subtheme, reset) {
    try {
        __openbexi_debugC("browse_CSS()", "Info:");

        this.set_mode("getWebTemplateCategory");

        var doc = this.getCommonData(event);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "templates");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "objectType", getSelectedBexiObj(null).type);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "subtheme", getSelectedBexiObj(null).subtheme);
        if (cssStyle == null)cssStyle = "ob_template_style";
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "cssStyle", cssStyle);

        if (getSelectedBexiObj(null).type == "openbexi_body") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webTemplateCategory");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template");
        }
        else {
            if (getSelectedBexiObj(null).type == "openbexi_dojo" && getSelectedBexiObj(null).subtype == "dojox.grid.Grid")
                if (subtheme == undefined || subtheme == "")
                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_grid");
                else
                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_grid/" + subtheme);
            else if (getSelectedBexiObj(null).type == "openbexi_timeline") {
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "timelineThemes");
                if (getSelectedBexiObj(null).template_mode == "bands") {
                    if (subtheme == undefined || subtheme == "")
                        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/bands");
                    else
                        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/bands/" + subtheme);
                } else if (getSelectedBexiObj(null).template_mode == "events") {
                    if (subtheme == undefined || subtheme == "")
                        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/data");
                    else
                        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/data/" + subtheme);

                } else {
                    if (subtheme == undefined || subtheme == "")
                        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/themes");
                    else
                        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/themes/" + subtheme);
                }
            }
            else {
                if (subtheme == undefined || subtheme == "")
                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/" + getSelectedBexiObj(null).type.replace("openbexi", "ob"));
                else
                    doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/" + getSelectedBexiObj(null).type.replace("openbexi", "ob") + "/" + subtheme);
            }
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "objectSelected", getSelectedBexiObj(null).id);
        }
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();

        if (ob_get_CSSPicker(getSelectedBexiObj(null).type) == null || reset == true) {
            // Show up specific tree menu according slected widget
            // Show DOJO_editor tree menu here
            if (getSelectedBexiObj(null).type == "openbexi_dojo_editor" && getSelectedBexiObj(null).mode == "editable")
                openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_CSS_editor_CB, "ob_menu_CSS_head", "Browsing CSS for DOJO Editor ...");
            else {
                // Show chartflow endpoint tree menu here
                if (ob_current_endpoint != null)
                //openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_CSS_chartFlow_endpoint_CB, "ob_menu_CSS_head", "Browsing CSS for chartFlow endpoint ...");
                    openbexi_browse_CSS_chartFlow_endpoint_CB(ob_xml);
                // Show chartflow connector tree menu here
                else if (ob_current_connector != null)
                //openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_CSS_chartFlow_connector_CB, "ob_menu_CSS_head", "Browsing CSS for chartFlow connector ...");
                    openbexi_browse_CSS_chartFlow_connector_CB(ob_xml);
                else {
                    // Show generic tree menu for all other widgets here
                    openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_CSS_CB, "ob_menu_CSS_head", "Browsing CSS ...");
                }
            }
        }
        else
            openbexiNavigator.create_tree("rawdata", eval(ob_get_CSSPicker(getSelectedBexiObj(null).type)), "ob_menu_CSS_sub", null, true, undefined, "ob_template_style");

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.browse_CSS()", "Exception: " + e.message);
    }
}
//###################################################################
//OPEN
function openbexi_open_web_page_project_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_open_web_page_project_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_open_web_page_project_CB bug ???");
            __openbexi_debugC("openbexi_open_web_page_project_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_open_web_page_project_CB() Info:", "status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_open_web_page_project_CB() Info:", "appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_open_web_page_project_CB() Exception:", exception);

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (file_count == "") __openbexi_debugC("openbexi_open_web_page_project_CB() Info:", "no project found");

        var projectName = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");
        if (projectName == "") {
            __openbexi_debugC("openbexi_open_web_page_project_CB() Exception::", "no project name found");
            openbexiNavigator.projectName = "no_name";
        }

        var filename = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "filename");
        if (filename == "")
            openbexiNavigator.set_webPageName("no_name");
        else
            openbexiNavigator.set_webPageName(filename.replace(".html", ""));

        if (appli_status == "ProjectDoNotExist") {
            openbexiNavigator.set_webPageName("no_name");
            openbexiNavigator.HTML_pageName = "no_name.html";
            openbexiNavigator.projectName = "no_name";
            openbexiNavigator.reset_top_frame_message();
            openbexi_unloading2();
            ob_manage_exception.ob_state.html = '<label><b> Sorry, Cannot find the project : ' + projectName + '.</b></label>'
            openbexiNavigator.prompt(null, ob_manage_exception);
            return;
        }
        if (appli_status == "WebPageDoNotExist") {
            openbexiNavigator.set_webPageName("no_name");
            openbexiNavigator.HTML_pageName = "no_name.html";
            openbexiNavigator.reset_top_frame_message();
            openbexi_unloading2();
            ob_manage_exception.ob_state.html = '<label><b> Sorry, cannot read anymore ' + filename + ' for the project:' + projectName + ' </b></label>';
            openbexiNavigator.prompt(null, ob_manage_exception);
            return;
        }
        if (appli_status == "CannotReadPage") {
            openbexiNavigator.set_webPageName("no_name");
            openbexiNavigator.HTML_pageName = "no_name.html";
            openbexiNavigator.reset_top_frame_message();
            openbexi_unloading2();
            ob_manage_exception.ob_state.html = '<label><b> Sorry, cannot read anymore ' + filename + ' for the project:' + projectName + ' </b></label><br /><br /><label> Reason, ' + exception + '.</label>';
            openbexiNavigator.prompt(null, ob_manage_exception);
            return;
        }
        if (appli_status == "CannotReadProject") {
            openbexiNavigator.set_webPageName("no_name");
            openbexiNavigator.HTML_pageName = "no_name.html";
            openbexiNavigator.projectName = "no_name";
            openbexiNavigator.reset_top_frame_message();
            openbexi_unloading2();
            ob_manage_exception.ob_state.html = '<label><b>Sorry, cannot open anymore the project:' + projectName + ' </b></label><br /><br /><label> Reason, ' + exception + '.</label>';
            openbexiNavigator.prompt(null, ob_manage_exception);
            return;
        }
        if (appli_status == "fileAlreadyExist") {
            ob_manage_exception.ob_state.html = '<label><b> Sorry, this web page already exists. Please choose another name for the project: ' + projectName + '.</b></label>'
            openbexiNavigator.prompt(null, ob_manage_exception);
        }

        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        if (subtype == "")
            __openbexi_debugC("openbexi_open_web_page_project_CB() Exception::", "no subtype  found");

        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") __openbexi_debugC("openbexi_open_web_page_project_CB() Info:", "no project path found");
        openbexiNavigator.path = path;

        if (subtype == "openTemplateHTMLPages" || subtype == "openNewTemplateHTMLPages") {
            var projectStatus = openbexi_getPageData(null, "ob_explorer", "template", "status");
            var templateCategory = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "templateCategory");
            if (projectStatus == "adding") {
                openbexi_updatePageData(null, "ob_explorer", "template", "status", "copied");
                openbexiNavigator.open_web_template_page(templateCategory, filename);
            } else {
                openbexi_open_HTML_page(projectName, openbexiNavigator.hrefPath + filename, ob_doc);
                openbexiNavigator.open_project("ob_menu_FileBrowser_sub", "browseTemplate");
            }
        } else {
            openbexi_open_HTML_page(projectName, openbexiNavigator.hrefPath + filename, ob_doc);
            openbexiNavigator.open_project("ob_menu_FileBrowser_sub", "Open");
        }

        openbexiNavigator.reset_top_frame_message();

    } catch (e) {
        __openbexi_debugC("openbexi_open_web_page_project_CB()", "Exception:" + e.message);
    }
    try {
        openbexi_unloading2();
    } catch (e) {
        __openbexi_debugC("openbexi_open_web_page_project_CB()", "Exception:" + e.message);
    }
}

openbexi_navigator.prototype.open_new_web_project_page = function (project) {
    openbexiNavigator.projectName = project;
    openbexi_updateWebPrivateData(null, "bexicontext", "ob_navigator", "mode", "ob_project");
    this.prompt(null, ob_add_NewPage);
}
openbexi_navigator.prototype.open_new_web_template_page = function (project) {
    openbexiNavigator.projectName = project;
    openbexiNavigator.templateCategory = project;
    openbexi_updateWebPrivateData(null, "bexicontext", "ob_navigator", "mode", "ob_template");
    this.prompt(null, ob_add_NewTemplatePage);
}

openbexi_navigator.prototype.open_web_templateCategory_page = function (category, template, newPage) {
    ob_add_NewTemplatePage2project.ob_state.title = '<b> Add this template to the "' + this.projectName + '" project?</b>';
    ob_add_NewTemplatePage2project.ob_state.html = '<label><b>Template name : <b></b></label><input class="ob_textarea" id="ob_add_NewTemplate" type="text" disabled="disabled" name="ob_add_NewTemplatePage2project" size="56" value="' + template + '"><br/><label><b>Category name : </b></label><input class="ob_textarea" id="ob_categoryTemplate" type="text" disabled="disabled" name="ob_add_NewPage" size="56" value="' + category + '"><br/><br/><label><b>New template name for the project: <b></label><input class="ob_textarea" id="ob_projectTemplate" type="text" disabled="disabled" name="ob_add_NewPage" size="56" value="template.html">';
    this.prompt(null, ob_add_NewTemplatePage2project);
}
openbexi_navigator.prototype.open_new_template_page = function (categoryTemplate, template, newPage) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_new_template_page(" + categoryTemplate + "," + template + "," + newPage + ")", "Info:");

        this.HTML_pageName = "template.html";
        openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", this.projectName);
        openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);
        openbexi_updateWebPrivateData(null, "bexicontext", "ob_navigator", "mode", "ob_project");

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_open_and_copyTemplateHTMLPagesRequest");
        if (newPage == true)
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openNewHTMLPages");
        else
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openHTMLPages");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", this.dir_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", this.file_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", this.HTML_pageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "template", template);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", this.path);

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", categoryTemplate);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_open_web_page_project_CB, "ob_menu_FileBrowser_head", "Opening webpage");
    } catch (e) {
        __openbexi_debugC("open_new_template_page()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_web_project_page = function (project, webPage, newPage) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_web_project_page(" + project + "," + webPage + "," + newPage + ")", "Info:");

        //if (this.FileBrowser_tree_first_start == true && project == this.projectName && webPage == this.HTML_pageName)  return;

        if (dirty_flag) {
            openbexiNavigator.New_projectName = project;
            openbexiNavigator.New_HTML_pageName = webPage;
            ob_savePage.ob_state.html = '<label>Saving the current page for the project ' + this.projectName + '.</label><br />' +
                    '<b><label class="ob_label">Project/label></b><input class="ob_textarea" id="ob_savePage_Project" type="text" name="ob_savePage_Project" readonly size="40" value="' + openbexiNavigator.projectName + '"><br />' +
                    '<b><label class="ob_label">Web page:</label></b><input class="ob_textarea" id="ob_savePage_WEB_page" type="text" name="ob_savePage_WEB_page" readonly size="40" value="' + openbexiNavigator.HTML_pageName + '">' +
                    '</label><br /><br />' + 'Do you want to save  "<b>' + this.HTML_pageName + '</b>"  before opening "<b>' + webPage + ' (project:' + project + ')</b>"?</label><br />';
            openbexiNavigator.prompt(null, ob_savePage);
            ob_setDirty_flag(false);
            return;
        }

        openbexiNavigator.New_projectName = "";
        openbexiNavigator.New_HTML_pageName = "";
        this.projectName = project;
        openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", this.projectName);
        this.HTML_pageName = webPage;
        openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);
        openbexi_updateWebPrivateData(null, "bexicontext", "ob_navigator", "mode", "ob_project");

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_openHTMLPagesRequest");
        if (webPage == "template.html")
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openHTMLTemplatePages");
        else if (newPage == true)
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openNewHTMLPages");
        else
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openHTMLPages");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", this.dir_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", this.file_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", this.HTML_pageName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", this.path);

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_open_web_page_project_CB, "ob_menu_FileBrowser_head", "Opening webpage");
    } catch (e) {
        __openbexi_debugC("open_web_project_page()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_web_archive_page = function (project, webPage) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_web_archive_page(" + project + "," + webPage + ")", "Info:");
        this.projectName = project;
        openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", this.projectName);
        openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_openArchiveHTMLPagesRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "openArchiveHTMLPages");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", this.dir_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", this.file_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", webPage);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", this.path);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_open_web_page_project_CB, "ob_menu_FileBrowser_head", "Opening Webpage from archives");
    } catch (e) {
        __openbexi_debugC("open_web_archive_page()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_archives = function (project, webPage) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_archives(" + project + "," + webPage + ")", "Info:");
        this.projectName = project;
        openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", this.projectName);
        this.HTML_pageName = webPage;
        openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);
        var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        if (navigator_mode == "ob_template")
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "archiveTemplates");
        else
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "archives");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", webPage);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", this.filename);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "archives");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "mode", "");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_project_CB, "ob_menu_FileBrowser_head", "Browsing Webpage archives ...");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_archives()", "Exception:" + e.message);
    }
}
function openbexi_browse_project_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_browse_project_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_browse_project_CB bug ???");
            __openbexi_debugC("openbexi_browse_project_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }
        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_browse_project_CB()", " Info: status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_browse_project_CB()", " Info: appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_browse_project_CB() ", "Error: " + exception);

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (file_count == "") __openbexi_debugC("openbexi_browse_project_CB()", " Warning: no project found");
        var ob_end = parseInt(file_count);

        var projectName = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");
        if (projectName == "") __openbexi_debugC("openbexi_browse_project_CB()", " Error: no project name found");

        var ob_menu = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "ob_menu");
        if (ob_menu == "") __openbexi_debugC("openbexi_browse_project_CB()", "Warning: no ob_menu found");

        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") __openbexi_debugC("openbexi_browse_project_CB()", "Error: no project path found");
        openbexiNavigator.path = path;

        var count_project = 0;
        var new_file_tree = "";
        if (parseInt(file_count) > 0) {
            while (openbexiNavigator.FileBrowser_json_tree[count_project] != undefined) count_project++;
            new_file_tree = "[\n";
            for (var i = 0; i < count_project; i++) {
                var project = openbexiNavigator.FileBrowser_json_tree[i].project;
                var label = openbexiNavigator.FileBrowser_json_tree[i].label;
                var id = openbexiNavigator.FileBrowser_json_tree[i].id;
                new_file_tree += " {\n";
                new_file_tree += " label: '" + label + "',\n";
                new_file_tree += " id: '" + id + "',\n";
                new_file_tree += " project: '" + project + "',\n";
                new_file_tree += " status: '" + "none" + "',\n";
                if (openbexiNavigator.FileBrowser_json_tree[i].project == projectName) {
                    new_file_tree += " children: [\n";
                    new_file_tree += " { label: '" + '<a  style="cursor:pointer;"  >' + "Archives" + '</a>' + "', id: '" + projectName + ".archives' , project_web_page_name: '" + projectName + "', status: '" + "__ARCHIVES" + "',\n";
                    if (subtype == "archives") {
                        new_file_tree += " children: [\n";
                        for (var n = 0; n < ob_end; n++) {
                            try {
                                var name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + n, "filename");
                                new_file_tree += " { label: '" + '<a  style="font-size:0.8em;cursor:pointer;" onclick=openbexiNavigator.open_web_archive_page(\"' + project + '\",\"' + name + '\") >' + name + '</a>' + "', id: '" + name + "' , project_web_page_name: '" + name + "', status: '" + "none" + "'},\n";
                            } catch (e1) {
                                __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_project_CB()", "Exception:" + e1.message);
                            }
                        }
                        new_file_tree += " ]},\n";
                    }
                    else {
                        new_file_tree += " children: [\n";
                        new_file_tree += " ]},\n";
                        for (var j = 0; j < ob_end; j++) {
                            try {
                                name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                                new_file_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + name + '\",' + false + ') >' + name + '</a>' + "', id: '" + name + "' , project_web_page_name: '" + name + "', status: '" + "none" + "'},\n";
                            } catch (e1) {
                                __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_project_CB()", "Exception:" + e1.message);
                            }
                        }
                    }
                    new_file_tree += " ]\n";
                }

                if (i != count_project - 1)
                    new_file_tree += " },\n";
                else
                    new_file_tree += " }\n";
            }

            new_file_tree += "];";
            //if (subtype == "archives") {
            openbexiNavigator.FileBrowser_json_tree = eval(new_file_tree);
            openbexiNavigator.FileBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(new_file_tree), "ob_menu_FileBrowser_sub", "FileBrowser_json_tree", false, null, openbexiNavigator.projectName);

            //}
        }
    } catch (e) {
        __openbexi_debugC("openbexi_browse_project_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

openbexi_navigator.prototype.browse_project = function (name, ob_menu) {
    try {
        __openbexi_debugC("browse_project(" + name + "," + ob_menu + ")", "Info:");

        this.set_mode("projects");
        this.sub_mode = "webPages";
        this.projectName = name;
        this.filename = name;
        this.path = name;

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webPages");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", this.dir_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", this.file_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", this.filename);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", this.path);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "ob_menu", ob_menu);

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_project_CB, "ob_menu_FileBrowser_head", "Browsing project ...");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.browse_project()", "Exception: " + e.message);
    }
}
openbexi_navigator.prototype.get_tree_node_data = function (tree, json_tree, criteria1, criteria2) {
    try {
        var i = 0;
        while (json_tree[i++] != undefined) {
            if (criteria1 == "project") {
                if (criteria2 == "id" && json_tree[i].project == project) return  json_tree[i].id;
                if (criteria2 == "label" && json_tree[i].project == project) return  json_tree[i].label;
                if (criteria2 == "status" && json_tree[i].project == project) return  json_tree[i].status;
            }
            if (criteria1 == "id") {
                if (criteria2 == "project" && json_tree[i].project == project) return  json_tree[i].project;
                if (criteria2 == "label" && json_tree[i].project == project) return  json_tree[i].label;
                if (criteria2 == "status" && json_tree[i].project == project) return  json_tree[i].status;
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.get_tree_node_data()", "Exception: " + e.message);
    }
    return null;
}
openbexi_navigator.prototype.expand_tree = function (tree, json_tree, id) {
    try {
        var obj = tree._itemNodeMap;
        tree._expandNode(obj[id]);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.collapse_tree()", "Exception: " + e.message);
    }
}
openbexi_navigator.prototype.collapse_tree = function (tree, json_tree, id) {
    try {
        var obj = tree._itemNodeMap;
        tree._collapseNode(obj[id]);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.collapse_tree()", "Exception: " + e.message);
    }
}
openbexi_navigator.prototype.collapse_all_tree = function (tree, json_tree) {
    try {
        var obj = tree._itemNodeMap;
        var i = 0;
        while (json_tree[i++] != undefined) {
            tree._collapseNode(obj[json_tree[i].id]);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.collapse_all_tree()", "Exception: " + e.message);
    }
}
openbexi_navigator.prototype.collapse_all_tree_except = function (tree, json_tree, current) {
    try {
        var obj = tree._itemNodeMap;
        var i = 0;
        while (json_tree[i++] != undefined) {
            if (current != i) tree._collapseNode(obj[json_tree[i].id]);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.collapse_all_tree()", "Exception: " + e.message);
    }
}
function openbexi_open_project_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_open_project_CB(" + responseXML + ")", "Info:");
        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_open_project_CB bug ???");
            __openbexi_debugC("openbexi_open_project_CB()", " Exception: No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        var ob_navigator_mode = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "ob_navigator", "mode");

        if (status != "" && status != "done") __openbexi_debugC("openbexi_open_project_CB()", "Info: status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_open_project_CB()", "Info: appli_status=" + appli_status);
        if (subtype == "create_webProjects") {
            if (appli_status == "ok") {
                openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", "ProjectCreated", "info", "40px");
            } else if (appli_status == "ProjectAlreadyExit") {
                openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", appli_status, "warning", "40px");
                openbexi_unloading2();
                return;
            } else {
                openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", appli_status, "error", "40px");
                openbexi_unloading2();
                return;
            }
        }

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_open_project_CB()", "Exception: " + exception);

        var ob_menu = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "ob_menu");
        if (ob_menu == "") __openbexi_debugC("openbexi_open_project_CB()", "Warning: no ob_menu found");

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (file_count == "") __openbexi_debugC("openbexi_open_project_CB()", "Warning: no project found");
        var ob_end = parseInt(file_count);

        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") __openbexi_debugC("openbexi_open_project_CB()", "Warning: no project path found");
        openbexiNavigator.path = path;

        var FileBrowser_tree = "[\n";
        var project;
        if (ob_navigator_mode == "browseAllProjects") {
            FileBrowser_tree += " {\n";
            if (openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode") == "ob_template")
                FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.open_project(\"ob_menu_FileBrowser_sub' + '\",' + '\"browseTemplate\"' + '); >' + "See current template category" + '</b>' + "',\n";
            else
                FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.open_project(\"ob_menu_FileBrowser_sub' + '\",' + '\"browseProject\"' + '); >' + "See current project" + '</b>' + "',\n";
            FileBrowser_tree += " id: 'see_all_projects',\n";
            FileBrowser_tree += " project: 'see_all_projects',\n";
            FileBrowser_tree += " status: '__closeFolder',\n";
            FileBrowser_tree += " },\n";
            FileBrowser_tree += " {\n";
            FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.prompt(\"' + null + '\",' + "ob_add_NewProject" + '); >' + "Create a new project" + '</b>' + "',\n";
            FileBrowser_tree += " id: 'new_project',\n";
            FileBrowser_tree += " project: 'new_project',\n";
            FileBrowser_tree += " status: '__closeFolder',\n";
            FileBrowser_tree += " },\n";
        } else if (ob_navigator_mode == "browseAllTemplates") {
            FileBrowser_tree += " {\n";
            FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.open_project(\"ob_menu_FileBrowser_sub' + '\",' + '\"browseTemplate\"' + '); >' + "See current template category" + '</b>' + "',\n";
            FileBrowser_tree += " id: 'see_all_projects',\n";
            FileBrowser_tree += " project: 'see_all_projects',\n";
            FileBrowser_tree += " status: '__closeFolder',\n";
            FileBrowser_tree += " },\n";
            FileBrowser_tree += " {\n";
            FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.prompt(\"' + null + '\",' + "ob_add_NewCategory" + '); >' + "Create a template category" + '</b>' + "',\n";
            FileBrowser_tree += " id: 'new_template_category',\n";
            FileBrowser_tree += " project: 'new_template_category',\n";
            FileBrowser_tree += " status: '__closeFolder',\n";
            FileBrowser_tree += " },\n";

        } else {
            FileBrowser_tree += " {\n";
            FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.open_project(\"ob_menu_FileBrowser_sub' + '\",' + '\"browseAllProjects\"' + '); >' + "See all projects" + '</b>' + "',\n";
            FileBrowser_tree += " id: 'see_all_projects',\n";
            FileBrowser_tree += " project: 'see_all_projects',\n";
            FileBrowser_tree += " status: '__project',\n";
            FileBrowser_tree += " },\n";
            FileBrowser_tree += " {\n";
            FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.open_project(\"ob_menu_FileBrowser_sub' + '\",' + '\"browseAllTemplates\"' + '); >' + "See all templates" + '</b>' + "',\n";
            FileBrowser_tree += " id: 'see_all_templates',\n";
            FileBrowser_tree += " project: 'see_all_templates',\n";
            FileBrowser_tree += " status: '__project',\n";
            FileBrowser_tree += " },\n";
        }

        if (ob_navigator_mode == "browseTemplateCategory") {
            FileBrowser_tree += " {\n";
            FileBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.prompt(\"' + null + '\",' + "ob_add_NewTemplatePage" + '); >' + "Create a new template" + '</b>' + "',\n";
            FileBrowser_tree += " id: 'new_template',\n";
            FileBrowser_tree += " project: 'new_template',\n";
            FileBrowser_tree += " status: 'status',\n";
            FileBrowser_tree += " },\n";
        }
        var webPage;
        var maxWebPages;
        for (var j = 0; j < ob_end; j++) {
            // No up directory if list driver case or certain cases
            try {
                project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                if ((ob_navigator_mode == "browseProject" || ob_navigator_mode == "browseTemplate") && project == openbexiNavigator.projectName) {
                    if (!project.match(RegExp("^.*\.(html|HTML|htm|HTM)$"))) {
                        FileBrowser_tree += " {\n";
                        FileBrowser_tree += " label: '" + '<b  style="cursor:pointer;" >' + project + '</b>' + "',\n";
                        FileBrowser_tree += " id: '" + j + project + "',\n";
                        FileBrowser_tree += " project: '" + project + "',\n";
                        FileBrowser_tree += " status: '" + "status" + "',\n";
                        FileBrowser_tree += " children: [\n";
                        maxWebPages = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project, "objectMaxCount");
                        if (ob_navigator_mode == "browseTemplate") {
                            FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_archives(\"' + project + '\",\"' + openbexiNavigator.HTML_pageName + '\") >' + "Archives" + '</a>' + "', id: '" + project + ".archives' , project_web_page_name: '" + project + "', status: '" + "__ARCHIVES" + "'},\n";
                            FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_new_web_template_page(\"' + project + '\") >' + "Create a new template" + '</a>' + "', id: '" + project + ".newPage' , project_web_page_name: '" + project + "', status: '" + "__HTML" + "'},\n";
                        } else {
                            FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_archives(\"' + project + '\",\"' + openbexiNavigator.HTML_pageName + '\") >' + "Archives" + '</a>' + "', id: '" + project + ".archives' , project_web_page_name: '" + project + "', status: '" + "__ARCHIVES" + "'},\n";
                            FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_new_web_project_page(\"' + project + '\") >' + "Create a new WEB page" + '</a>' + "', id: '" + project + ".newPage' , project_web_page_name: '" + project + "', status: '" + "__HTML" + "'},\n";

                        }
                        if (openbexiNavigator.HTML_pageName == "template.html")
                            FileBrowser_tree += " { label: '" + '<img src="gif/ob_ok_x22.png"><a style="cursor:pointer;border-bottom:1px dotted black;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + "template.html" + '\",' + false + ') >' + "Edit/Update template" + '</a>' + "', id: '" + j + "template" + "' , project_web_page_name: '" + "template.html" + "', status: '" + "__EDIT" + "'},\n";
                        else if (ob_navigator_mode != "browseTemplate")
                            FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + "template.html" + '\",' + false + ') >' + "Edit/Update template" + '</a>' + "', id: '" + j + "template" + "' , project_web_page_name: '" + "template.html" + "', status: '" + "__EDIT" + "'},\n";

                        if (parseInt(maxWebPages) == 0)maxWebPages = 1;
                        for (var k = 0; k < parseInt(maxWebPages); k++) {
                            webPage = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project + "_" + k, "filename");
                            if (webPage == "")  webPage = "no_name.html";
                            if (webPage != "template.html")
                                if (webPage == openbexiNavigator.HTML_pageName && project == openbexiNavigator.projectName)
                                    FileBrowser_tree += " { label: '" + '<img src="gif/ob_ok_x22.png"><a style="cursor:pointer;border-bottom:1px dotted black;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                else if (ob_navigator_mode == "browseTemplate")
                                    FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_template_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                else
                                    FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                        }
                        FileBrowser_tree += " ]\n";
                        if (j != ob_end - 1) {
                            FileBrowser_tree += " },\n";
                        } else {
                            FileBrowser_tree += " }\n";
                        }
                    }
                }
                if (ob_navigator_mode == "browseAllProjects") {
                    if (!project.match(RegExp("^.*\.(html|HTML|htm|HTM)$"))) {
                        FileBrowser_tree += " {\n";
                        FileBrowser_tree += " label: '" + '<b  style="cursor:pointer;" >' + project + '</b>' + "',\n";
                        FileBrowser_tree += " id: '" + j + project + "',\n";
                        FileBrowser_tree += " project: '" + project + "',\n";
                        FileBrowser_tree += " status: '" + "status" + "',\n";
                        FileBrowser_tree += " children: [\n";
                        maxWebPages = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project, "objectMaxCount");
                        //FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_archives(\"' + project + '\",\"' + openbexiNavigator.HTML_pageName + '\") >' + "Archives" + '</a>' + "', id: '" + project + ".archives' , project_web_page_name: '" + project + "', status: '" + "__ARCHIVES" + "'},\n";
                        FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_new_web_project_page(\"' + project + '\") >' + "Create a new WEB page" + '</a>' + "', id: '" + project + ".newPage' , project_web_page_name: '" + project + "', status: '" + "__HTML" + "'},\n";
                        if (openbexiNavigator.HTML_pageName == "template.html")
                            FileBrowser_tree += " { label: '" + '<img src="gif/ob_ok_x22.png"><a style="cursor:pointer;border-bottom:1px dotted black;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + "template.html" + '\",' + false + ') >' + "Edit/Update template" + '</a>' + "', id: '" + j + "template" + "' , project_web_page_name: '" + "template.html" + "', status: '" + "__EDIT" + "'},\n";
                        else
                            FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + "template.html" + '\",' + false + ') >' + "Edit/Update template" + '</a>' + "', id: '" + j + "template" + "' , project_web_page_name: '" + "template.html" + "', status: '" + "__EDIT" + "'},\n";

                        if (parseInt(maxWebPages) == 0)maxWebPages = 1;
                        for (var k = 0; k < parseInt(maxWebPages); k++) {
                            webPage = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project + "_" + k, "filename");
                            if (webPage == "")  webPage = "no_name.html";
                            if (webPage != "template.html")
                                if (ob_navigator_mode == "browseTemplateCategory")
                                    FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_templateCategory_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                else {
                                    if (webPage == openbexiNavigator.HTML_pageName && project == openbexiNavigator.projectName)
                                        FileBrowser_tree += " { label: '" + '<img src="gif/ob_ok_x22.png"><a style="cursor:pointer;border-bottom:1px dotted black;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                    else
                                        FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_project_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                }
                        }
                        FileBrowser_tree += " ]\n";
                        if (j != ob_end - 1) {
                            FileBrowser_tree += " },\n";
                        } else {
                            FileBrowser_tree += " }\n";
                        }
                    }
                }
                if (ob_navigator_mode == "browseAllTemplates" || ob_navigator_mode == "browseTemplateCategory") {
                    if (!project.match(RegExp("^.*\.(html|HTML|htm|HTM)$"))) {
                        FileBrowser_tree += " {\n";
                        FileBrowser_tree += " label: '" + '<b  style="cursor:pointer;" >' + project + '</b>' + "',\n";
                        FileBrowser_tree += " id: '" + j + project + "',\n";
                        FileBrowser_tree += " project: '" + project + "',\n";
                        FileBrowser_tree += " status: '" + "status" + "',\n";
                        FileBrowser_tree += " children: [\n";
                        maxWebPages = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project, "objectMaxCount");
                        //FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_archives(\"' + project + '\",\"' + openbexiNavigator.HTML_pageName + '\") >' + "Archives" + '</a>' + "', id: '" + project + ".archives' , project_web_page_name: '" + project + "', status: '" + "__ARCHIVES" + "'},\n";
                        if (ob_navigator_mode == "browseTemplateCategory")
                            FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_new_web_template_page(\"' + project + '\") >' + "Create a new template category" + '</a>' + "', id: '" + project + ".newPage' , project_web_page_name: '" + project + "', status: '" + "__HTML" + "'},\n";
                        else
                            FileBrowser_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.open_new_web_template_page(\"' + project + '\") >' + "Create a new template" + '</a>' + "', id: '" + project + ".newPage' , project_web_page_name: '" + project + "', status: '" + "__HTML" + "'},\n";
                        if (parseInt(maxWebPages) == 0)maxWebPages = 1;
                        for (var k = 0; k < parseInt(maxWebPages); k++) {
                            webPage = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project + "_" + k, "filename");
                            if (webPage == "")  webPage = "no_name.html";
                            if (webPage != "template.html")
                                if (ob_navigator_mode == "browseTemplateCategory")
                                    FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_templateCategory_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                else {
                                    if (webPage == openbexiNavigator.HTML_pageName)
                                        FileBrowser_tree += " { label: '" + '<img src="gif/ob_ok_x22.png"><a style="cursor:pointer;border-bottom:1px dotted black;" onclick=openbexiNavigator.open_web_template_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                    else
                                        FileBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.open_web_template_page(\"' + project + '\",\"' + webPage + '\",' + false + ') >' + webPage + '</a>' + "', id: '" + j + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                                }
                        }
                        FileBrowser_tree += " ]\n";
                        if (j != ob_end - 1) {
                            FileBrowser_tree += " },\n";
                        } else {
                            FileBrowser_tree += " }\n";
                        }
                    }
                }
            } catch (e1) {
                __openbexi_debugC("openbexi_navigator.prototype.openbexi_open_project_CB()", "Exception:" + e1.message);
            }
        }

        FileBrowser_tree += "];";
        openbexiNavigator.FileBrowser_json_tree = eval(FileBrowser_tree);
        if (openbexiNavigator.FileBrowser_tree_first_start && ob_navigator_mode != "browseProject" && ob_navigator_mode != "browseTemplate") {
            openbexiNavigator.FileBrowser_tree_first_start = false;
            openbexiNavigator.FileBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(FileBrowser_tree), ob_menu, "FileBrowser_json_tree", null, true, undefined);
        } else if (ob_navigator_mode == "browseProject")
            openbexiNavigator.FileBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(FileBrowser_tree), ob_menu, "FileBrowser_json_tree", false, null, openbexiNavigator.projectName);
        else if (ob_navigator_mode == "browseTemplate")
            openbexiNavigator.FileBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(FileBrowser_tree), ob_menu, "FileBrowser_json_tree", false, null, openbexiNavigator.projectName);
        else
            openbexiNavigator.FileBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(FileBrowser_tree), ob_menu, "FileBrowser_json_tree", true, null, undefined);

    }
    catch
            (e) {
        __openbexi_debugC("openbexi_open_project_CB()", "Exception:" + e.message);
    }
    openbexi_save_bexicontext();
    openbexi_unloading2();
}

function create_new_project_CB(responseXML) {
    try {
        __openbexi_debugC("create_new_project_CB(" + responseXML + ")", "Info:");
        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("create_new_project_CB bug ???");
            __openbexi_debugC("create_new_project_CB()", " Exception: No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        if (status != "" && status != "done") __openbexi_debugC("create_new_project_CB()", "Info: status=" + status);
        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("create_new_project_CB()", "Info: appli_status=" + appli_status);
        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("create_new_project_CB()", "Exception: " + exception);
        var project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");

        if (appli_status == "ok" && exception == "") {
            if (document.getElementById('ob_menu_FileBrowser') != null && document.getElementById('ob_menu_FileBrowser').style.visibility == "hidden")
                openbexiNavigator.window_factory(null, 'ob_menu_FileBrowser', null, "minimize");
            openbexiNavigator.open_project("ob_menu_FileBrowser_sub", "webTemplateCategory");
            ob_add_NewTemplate.ob_state.html = '<label>Please Select a existing template for the current project : ' + openbexiNavigator.projectName + '</label>';
            ob_setDirty_flag(false);
            openbexiNavigator.prompt(null, ob_add_NewTemplate);
        }

        else if (appli_status == "ProjectAlreadyExit") {
            ob_add_NewProject.ob_state.title = '<b> Creating a new project </b>';
            if (project == "" || project == "no_name")
                ob_add_NewProject.ob_state.html = '<label> Please enter a project valid name.</label><br /><br /><input class="ob_textarea" id="ob_add_NewProject" type="text" name="ob_add_NewProject" size="56" value="">';
            else
                ob_add_NewProject.ob_state.html = '<label> The project <b>' + project + ' </b>already exists, please enter a valid name.</label><br /><br /><input class="ob_textarea" id="ob_add_NewProject" type="text" name="ob_add_NewProject" size="56" value="">';
            openbexiNavigator.prompt(null, ob_add_NewProject);
        }
        else if (exception != "") {
            ob_manage_exception.ob_state.html = '<label> Sorry, cannot create this project.</label><br /><br /><label> <b>Reason, ' + exception + '.</b></label>';
            openbexiNavigator.prompt(null, ob_manage_exception);
        }
        else {
            ob_manage_exception.ob_state.html = '<label> Sorry, cannot create this project.</label><br /><br /><label>';
            openbexiNavigator.prompt(null, ob_manage_exception);
        }

    } catch (e) {
        __openbexi_debugC("create_new_project_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}
function create_new_category_CB(responseXML) {
    try {
        __openbexi_debugC("create_new_category_CB(" + responseXML + ")", "Info:");
        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("create_new_category_CB bug ???");
            __openbexi_debugC("create_new_category_CB()", " Exception: No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        if (status != "" && status != "done") __openbexi_debugC("create_new_category_CB()", "Info: status=" + status);
        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("create_new_category_CB()", "Info: appli_status=" + appli_status);
        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("create_new_category_CB()", "Exception: " + exception);
        var project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");

        if (appli_status == "ok" && exception == "") {
            if (document.getElementById('ob_menu_FileBrowser') != null && document.getElementById('ob_menu_FileBrowser').style.visibility == "hidden")
                openbexiNavigator.window_factory(null, 'ob_menu_FileBrowser', null, "minimize");
            openbexiNavigator.open_project("ob_menu_FileBrowser_sub", "webTemplateCategory");
        }

        else if (appli_status == "TemplateCategoryAlreadyExist") {
            ob_add_NewCategory.ob_state.title = '<b> Creating a new template category </b>';
            if (project == "" || project == "no_name")
                ob_add_NewCategory.ob_state.html = '<label> Please enter a template category valid name.</label><br /><br /><input class="ob_textarea" id="ob_add_NewCategory" type="text" name="ob_add_NewCategory" size="56" value="">';
            else
                ob_add_NewCategory.ob_state.html = '<label> The template category <b>' + project + ' </b>already exists, please enter a valid name.</label><br /><br /><input class="ob_textarea" id="ob_add_NewCategory" type="text" name="ob_add_NewCategory" size="56" value="">';
            openbexiNavigator.prompt(null, ob_add_again_NewCategory);

        } else if (exception != "") {
            ob_manage_exception.ob_state.html = '<label> Sorry, cannot create this template category.</label><br /><br /><label> <b>Reason, ' + exception + '.</b></label>';
            openbexiNavigator.prompt(null, ob_manage_exception);
        }
        else {
            ob_manage_exception.ob_state.html = '<label> Sorry, cannot create this template category.</label><br /><br /><label>';
            openbexiNavigator.prompt(null, ob_manage_exception);
        }

    } catch (e) {
        __openbexi_debugC("create_new_category_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}
openbexi_navigator.prototype.create_new_project = function (projectName) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.create_new_project()", "Info:");

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_createProjectRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "create_webProjects");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "ob_menu", "ob_menu_FileBrowser_sub");
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, create_new_project_CB, "ob_menu_RequestBrowser_head", "Creating new project ...");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.create_new_project()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.create_new_category = function (categoryName) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.create_new_project()", "Info:");

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_createTemplateCategoryRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "create_webTemplateCategory");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", categoryName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "ob_menu", "ob_menu_FileBrowser_sub");
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, create_new_category_CB, "ob_menu_RequestBrowser_head", "Creating new template category ...");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.create_new_category()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_templateCategory = function (ob_menu, type) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_templateCategory(" + ob_menu + ")", "Info:");

        this.set_mode("projects");
        this.sub_mode = "getWebProjects";

        // Request project directory from server
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webTemplateCategory");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
        if (type == undefined)
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseAllProjects");
        else
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseProject");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", this.dir_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", this.file_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "ob_menu", ob_menu);

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "mode", type);

        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_open_project_CB, "ob_menu_RequestBrowser_head", "Opening templates ...");

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_templateCategory()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_project = function (ob_menu, type) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_project(" + ob_menu + ")", "Info:");

        //if (document.getElementById('ob_menu_widget') != null && document.getElementById('ob_menu_widget').style.visibility != "hidden")
        if (document.getElementById('ob_menu_widget') != null)
            this.window_factory(null, 'ob_menu_widget', null, 'hidden');

        this.set_mode("projects");
        this.sub_mode = "getWebProjects";
        var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");

        // Request project directory from server
        var doc = null;

        if (type == "openbexi_createTemplateCategoryRequest_overwrite") {
            type = "openbexi_createTemplateCategoryRequest";
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "dir", "overwrite", "true");
        }
        if (type == "openbexi_createTemplateCategoryRequest_no_overwrite") {
            type = "openbexi_createTemplateCategoryRequest";
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "dir", "overwrite", "false");
        }
        if (type == "openbexi_createTemplateCategoryRequest") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", type);
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_createTemplateCategoryRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
            var filename = this.templateName.replace("\.html", "");
            filename = filename + "\.html";
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "template", "name", filename);
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "page", "name", this.HTML_pageName);
        }
        else if (type == "browseAllTemplates") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webTemplateCategory");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseAllTemplates");
        }
        else if (type == "browseAllProjects") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webProjects");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseAllProjects");
        }
        else if (type == "browseTemplate") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webTemplateCategory");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseTemplate");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        }
        else if (type == "Delete") {
            if (navigator_mode == "ob_template") {
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webTemplateCategory");
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseTemplateCategory");
            } else {
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webProjects");
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
                doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseProject");
            }
        }
        else {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "webProjects");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseProject");
        }
        if (type == "webTemplateCategory") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", type);
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "ob_navigator", "mode", "browseTemplateCategory");
        }
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", this.dir_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", this.file_filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "ob_menu", ob_menu);

        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);

        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "mode", type);

        var ob_xml = openbexi_get_xmlString(doc);

        var mode_sync = openbexi_synchron();
        if (type == "Delete")
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_delete_or_save_project_CB, "ob_menu_RequestBrowser_head", "Deleting Web page...");
        else if (type == "Save")
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_delete_or_save_project_CB, "ob_menu_RequestBrowser_head", "Saving ...");
        else if (type == "openbexi_createTemplateCategoryRequest")
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_save_template_CB, "ob_menu_RequestBrowser_head", "Creating template ..");
        else
            openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_open_project_CB, "ob_menu_RequestBrowser_head", "Opening projects ...");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_project()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.project = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        this.FileBrowser_tree_first_start = true;
        this.window_factory(event, 'ob_menu_FileBrowser', null, 'minimize');
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.project()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_project_on = function () {
    try {
        this.top_frame_message("Open", "30px");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_project_on()", "Exception:" + e.message);
    }
}

//###################################################################
//OPEN SQL BROWSER
openbexi_navigator.prototype.set_database_data = function (connection_number) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.set_database_data(" + connection_number + ")", "Info:");

        // Check if the page has already be published
        var database = "";
        var url = "";
        var user = "";
        var passwd = "";
        var driver = "";

        var doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        if (connection_number == null)
            connection_number = get_xml_classe_object_attribut_value(doc, "ob_database", "connection", "number");

        database = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "myName");
        url = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "url");
        user = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "user");
        passwd = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "passwd");
        driver = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "driver");

        if (document.getElementById("bexicontext_connection"))    document.getElementById("bexicontext_connection").value = connection_number;
        if (document.getElementById("bexicontext_database"))    document.getElementById("bexicontext_database").value = database;
        if (document.getElementById("bexicontext_url"))    document.getElementById("bexicontext_url").value = url;
        if (document.getElementById("bexicontext_username"))    document.getElementById("bexicontext_username").value = user;
        if (document.getElementById("bexicontext_passwd"))    document.getElementById("bexicontext_passwd").value = passwd;
        if (document.getElementById("bexicontext_driver"))    document.getElementById("bexicontext_driver").value = driver;

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.set_database_data()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_SQLBrowser = function (ob_menu) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_SQLBrowser(" + ob_menu + ")", "Info:");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_SQLBrowser()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.LNRequest = function (objectType, table, attribut) {
    try {
        if (table == undefined) return;
        var request = "select * from " + table;
        if (objectType == "openbexi_list")
            request = "select " + attribut + " from " + table;
        openbexi_LNRequest(null, null, null, objectType, null, null, "create_form", table, attribut, request, "sql", null, null, null, null, null, "true");
        openbexi_updatePageData(null, "page", getSelectedBexiObj(null).div.id, "sql_table", table);
        openbexi_updatePageData(null, "page", getSelectedBexiObj(null).div.id, "sql_request", request);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.LNRequest()", "Exception:" + e.message);
    }
}
function openbexi_browse_SQL_database_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_browse_SQL_database_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_browse_SQL_database_CB bug ???");
            __openbexi_debugC("openbexi_browse_SQL_database_CB() Exception:", "No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_browse_SQL_database_CB()", " Info: status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_browse_SQL_database_CB()", " Info: appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_browse_SQL_database_CB() ", "Error: " + exception);

        var projectName = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");
        if (projectName == "") __openbexi_debugC("openbexi_browse_SQL_database_CB()", " Error: no project name found");

        var ob_menu = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "ob_menu");
        if (ob_menu == "") __openbexi_debugC("openbexi_browse_SQL_database_CB()", "Warning: no ob_menu found");


        var requesttype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "type");
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");

        var database_connection_number = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "connection", "number");
        var database_name = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + database_connection_number, "myName");
        var database_connection_status = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + database_connection_number, "connected");
        var table_name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "filename");
        __openbexi_debugC("openbexi_browse_SQL_database_CB()", "info: database_connection_status: " + database_connection_status);

        var SQLstatus = get_xml_classe_object_attribut_value(ob_doc, "SQLDatabase", "status", "text");
        if (SQLstatus == "failed") {
            var SQLerror = get_xml_classe_object_attribut_value(ob_doc, "SQLDatabase", "status", "error");
            __openbexi_debugC("openbexi_browse_SQL_database_CB()", "Warning: =" + SQLstatus);
        }
        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (file_count == "") {
            file_count = 0;
            if (subtype == "database_table")
                __openbexi_debugC("openbexi_browse_SQL_database_CB()", " Warning: no table found");
        }

        var new_file_tree = "";
        var count_database = 0;
        var extend_node = "0";
        var extend_child_node = "0";
        if (parseInt(file_count) > 0) {
            while (openbexiNavigator.SQLBrowser_json_tree[count_database] != undefined) count_database++;
            new_file_tree = "[\n";
            for (var i = 0; i < count_database; i++) {
                var database = openbexiNavigator.SQLBrowser_json_tree[i].database;
                var label = openbexiNavigator.SQLBrowser_json_tree[i].label;
                var id = openbexiNavigator.SQLBrowser_json_tree[i].id;
                new_file_tree += " {\n";
                new_file_tree += " label: '" + label + "',\n";
                new_file_tree += " id: '" + id + "',\n";
                new_file_tree += " database: '" + database + "',\n";
                new_file_tree += " status: '__SQL',\n";
                if (i == database_connection_number) extend_node = id;
                if (database == database_name) {
                    if (subtype == "database_table_attribute") {
                        var count_table = 0;
                        new_file_tree += " children: [\n";
                        while (openbexiNavigator.SQLBrowser_json_tree[i].children[count_table] != undefined) {
                            var table = openbexiNavigator.SQLBrowser_json_tree[i].children[count_table].database_table_name;
                            if (table != table_name) {
                                new_file_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.browse_SQL_database(\"' + database + '\",\"' + ob_menu + '\",' + database_connection_number + ',\"database_table_attribute\",\"' + table + '\") >' + table + '</a>' + "', id: '" + table + ".__TABLE" + "' , database_table_name: '" + table + "', status: '" + "__TABLE" + "'},\n";
                            } else {
                                extend_child_node = table + ".__TABLE";
                                new_file_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.LNRequest(\"' + "openbexi_table" + '\",\"' + table + '\") >' + table + '</a>' + "', id: '" + table + ".__TABLE" + "' , database_table_name: '" + table + "', status: '" + "__TABLE" + "',\n";
                                new_file_tree += " children: [\n";
                                for (var n = 1; n < parseInt(file_count); n++) {
                                    try {
                                        var list = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + n, "filename");
                                        new_file_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.LNRequest(\"' + "openbexi_list" + '\",\"' + table + '\",\"' + list + '\")>' + list + '</a>' + "', id: '" + list + ".__LIST" + "' , database_list_name: '" + list + "', status: '" + "__LIST" + "'},\n";
                                    } catch (e1) {
                                        __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_SQL_database_CB()", "Exception:" + e1.message);
                                    }
                                }
                                new_file_tree += " ]},\n";
                            }
                            count_table++;
                        }
                        new_file_tree += " ]\n";
                    } else {
                        new_file_tree += " children: [\n";
                        for (var j = 0; j < parseInt(file_count); j++) {
                            try {
                                var name = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                                new_file_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.browse_SQL_database(\"' + database + '\",\"' + ob_menu + '\",' + database_connection_number + ',\"database_table_attribute\",\"' + name + '\") >' + name + '</a>' + "', id: '" + name + ".__TABLE" + "' , database_table_name: '" + name + "', status: '" + "__TABLE" + "'},\n";
                            } catch (e1) {
                                __openbexi_debugC("openbexi_navigator.prototype.openbexi_browse_SQL_database_CB()", "Exception:" + e1.message);
                            }
                        }
                        new_file_tree += " ]\n";
                    }
                } else {
                    var count_database_table = 0;
                    new_file_tree += " children: [\n";
                    for (var l = 0; l < count_database_table; l++) {
                        var label_child = openbexiNavigator.SQLBrowser_json_tree[i].children[l].label;
                        var id_child = openbexiNavigator.SQLBrowser_json_tree[i].children[l].id;
                        var database_table_name = openbexiNavigator.SQLBrowser_json_tree[i].children[l].database_table_name;
                        new_file_tree += " { label: '" + '<a  style="cursor:pointer;" onclick=openbexiNavigator.browse_SQL_database(\"' + database + '\",\"' + ob_menu + '\",' + database_connection_number + ',\"database_table\",\"' + name + '\") >' + name + '</a>' + label_child + "', id: '" + l + id_child + "' , database_table_name: '" + database_table_name + "', status: '" + "none" + "'},\n";
                    }
                    new_file_tree += " ]\n";
                }
                if (i != count_database - 1)
                    new_file_tree += " },\n";
                else
                    new_file_tree += " }\n";
            }

            new_file_tree += "];";
            openbexiNavigator.SQLBrowser_json_tree = eval(new_file_tree);
            openbexiNavigator.SQLBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(new_file_tree), ob_menu, "SQLBrowser_tree", undefined, extend_node, extend_child_node);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_browse_SQL_database_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

openbexi_navigator.prototype.browse_SQL_database = function (database, ob_menu, connection_number, subtype, table) {
    try {
        __openbexi_debugC("browse_SQL_database(" + database + "," + ob_menu + "," + connection_number + "," + subtype + "," + table + ")", "Info:");

        this.set_mode("databaseArea");
        this.sub_mode = subtype;

        if (database == null) {
            var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
            connection_number = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "connection", "number");
            database = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "myName");
        }

        var doc = this.getDatabaseObject(connection_number);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", subtype);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "ob_menu", ob_menu);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);
        if (subtype == "database_table_attribute") {
            set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", table);
        }
        // Create ob_SQL_database window
        //openbexiNavigator.window_factory(null, "ob_menu_RequestBrowser", ob_SQL_database, "maximize");

        var myName = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "myName");
        var url = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "url");
        var user = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "user");
        var passwd = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "passwd");
        var driver = get_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "driver");

        if (document.getElementById("bexicontext_database"))    document.getElementById("bexicontext_database").value = myName;
        if (document.getElementById("bexicontext_url"))    document.getElementById("bexicontext_url").value = url;
        if (document.getElementById("bexicontext_username"))    document.getElementById("bexicontext_username").value = user;
        if (document.getElementById("bexicontext_passwd"))    document.getElementById("bexicontext_passwd").value = passwd;
        if (document.getElementById("bexicontext_driver"))    document.getElementById("bexicontext_driver").value = driver;
        if (document.getElementById("bexicontext_connection"))    document.getElementById("bexicontext_connection").value = connection_number;

        // Update tree
        var ob_xml = openbexi_get_xmlString(doc);
        var mode_sync = openbexi_synchron();
        openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_browse_SQL_database_CB, "ob_menu_FileBrowser_head", "Browsing database ...");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.browse_SQL_database()", "Exception: " + e.message);
    }
}
openbexi_navigator.prototype.open_SQL_DataBase = function (ob_menu) {
    try {
        var ob_doc;
        __openbexi_debugC("openbexi_navigator.prototype.open_SQL_DataBase()", "Info:");

        this.set_mode("databaseArea");

        var database_objects = this.getDatabaseObjects(null);
        ob_doc = this.getObjects(ob_doc, database_objects);

        var database_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (database_count == "") {
            __openbexi_debugC("openbexi_navigator.prototype.open_SQL_DataBase() Exception:", database_count);
            database_count = 0;
            alert("Sorry, no database found.");
        }
        var ob_start = 0;
        var ob_end = parseInt(database_count);

        var SQLBrowser_tree = "[\n";
        var database;
        for (var j = ob_start; j < ob_end; j++) {
            // No up directory if list driver case or certain cases
            try {
                database = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                SQLBrowser_tree += " {\n";
                if (j == 0)
                    if (ob_menu == "ob_menu_SQLBrowser_sub")
                        SQLBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.window_factory(event,\"ob_menu_SQLBrowser\",null,\"hidden\");openbexiNavigator.window_factory(event,\"ob_menu_RequestBrowser\",ob_SQL_database,\"maximize"); >' + "Update database" + '</b>' + "',\n";
                    else
                        SQLBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.addNewDatabase(null);openbexiNavigator.window_factory(event,\"ob_menu_RequestBrowser\",ob_SQL_database,\"maximize"); >' + "Create a new database" + '</b>' + "',\n";
                else
                    SQLBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.browse_SQL_database(\"' + database + '\",\"' + ob_menu + '\",' + j + ',\"database_table\") >' + database + '</b>' + "',\n";

                SQLBrowser_tree += " id: '" + j + database + "',\n";
                SQLBrowser_tree += " database: '" + database + "',\n";
                if (j == 0)
                    SQLBrowser_tree += " status: '" + "__newSQL" + "',\n";
                else
                    SQLBrowser_tree += " status: '" + "__SQL" + "',\n";
                SQLBrowser_tree += " children: [\n";
                SQLBrowser_tree += " ]\n";
                if (j != ob_end - 1) {
                    SQLBrowser_tree += " },\n";
                } else {
                    SQLBrowser_tree += " }\n";
                }
            } catch (e1) {
                __openbexi_debugC("openbexi_navigator.prototype.open_SQL_DataBase()", "Exception:" + e1.message);
            }
        }

        SQLBrowser_tree += "];";

        // Create tree
        openbexiNavigator.SQLBrowser_json_tree = eval(SQLBrowser_tree);
        if (openbexiNavigator.SQLBrowser_tree_first_start) {
            openbexiNavigator.SQLBrowser_tree_first_start = false;
            openbexiNavigator.SQLBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(SQLBrowser_tree), ob_menu, "SQLBrowser_json_tree", null, null, true, undefined);
        } else
            openbexiNavigator.SQLBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(SQLBrowser_tree), ob_menu, "SQLBrowser_json_tree", null, null, undefined, undefined);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_SQL_DataBase()", "Exception:" + e.message);
    }
}
//##################################################################
//JAVASCRIPT  BROWSER
openbexi_navigator.prototype.javascript = function (event, display) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        openbexiNavigator.window_factory(event, "ob_menu_JavascriptBrowser", null, "minimize");
        if (display)
            openbexi_display_javascript_parameters(event, null, null);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.javascript()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.getJavascripts = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        var doc = this.getCommonData(event);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "javascripts");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "js");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "objectType", getSelectedBexiObj(null).type);
        try {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "objectSelected", getSelectedBexiObj(null).div.id);
        } catch (e) {
            __openbexi_debugC("openbexi_navigator.prototype.getJavascripts()", "Exception:" + e.message);
        }
        this.getdataFromServer("javascripts", doc);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getJavascripts()", "Exception:" + e.message);
        return doc;
    }
}
//###################################################################
//PUBLISH   - FTP BROWSER
openbexi_navigator.prototype.open_publish = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        ob_undofadeInBody();
        if (this.working) return;
        this.window_factory(event, 'ob_menu_RequestBrowser', ob_publish_page, 'maximize');
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_publish()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.publish_on = function () {
    try {
        this.top_frame_message("Publish Your Web Page", "310px");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.publish_on()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.saveSftp = function (event, field) {
    try {
        var connection3 = "";
        var website3 = "";
        var host3 = "";
        var user3 = "";
        var passwd3 = "";
        var PublicKey3 = "";
        var SocketTimeout3 = "";
        var path3 = "";
        var keyCode;
        var connection_number = 0;

        if (event) {
            keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        }

        if (document.getElementById("bexicontext_connection")) connection_number = openbexi_clearText(document.getElementById("bexicontext_connection").value);
        if (document.getElementById("bexicontext_website")) {
            website3 = openbexi_clearText(document.getElementById("bexicontext_website").value);
            if (field == "bexicontext_website") website3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_hostname")) {
            host3 = openbexi_clearText(document.getElementById("bexicontext_hostname").value);
            if (field == "bexicontext_hostname") host3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_username")) {
            user3 = openbexi_clearText(document.getElementById("bexicontext_username").value);
            if (field == "bexicontext_username") user3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_passwd")) {
            passwd3 = document.getElementById("bexicontext_passwd").value;
            if (field == "bexicontext_passwd") passwd3 = passwd3 + String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_PublicKey")) {
            PublicKey3 = openbexi_clearText(document.getElementById("bexicontext_PublicKey").value);
            if (field == "bexicontext_PublicKey") PublicKey3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_SocketTin")) {
            SocketTimeout3 = openbexi_clearText(document.getElementById("bexicontext_SocketTin").value);
            if (field == "bexicontext_SocketTin") SocketTimeout3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_path")) {
            path3 = document.getElementById("bexicontext_path").value;
            if (field == "bexicontext_path") path3 += String.fromCharCode(keyCode);
        }

        var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection", "number", connection_number);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "website", website3.ob_trim());
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "host", host3.ob_trim());
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "user", user3.ob_trim());
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "passwd", passwd3.ob_trim());
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "PublicKey", PublicKey3.ob_trim());
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "SocketTimeout", SocketTimeout3.ob_trim());
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "path", path3.ob_trim());
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(privateDoc));
        if (field != "bexicontext_passwd")openbexi_saveXMLFile("private_bexicontext.xml", OPENBEXI_PRIVATE_CONTEXT_XML);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.saveServer()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.removeSftpConnection = function (connection_number) {
    try {
        if (connection_number == null) {
            //Look for connection according hidden input field
            if (document.getElementById("bexicontext_connection"))    connection_number = document.getElementById("bexicontext_connection").value;
            if (connection_number == "") {
                __openbexi_debugC("openbexi_navigator.prototype.removeSftpConnection()", "Error:Cannot remove this FTP connection ...");
                return;
            }
        }

        var doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        doc = delete_xml_classe_object(doc, "ob_ssh", "connection_" + connection_number);
        var connectionCount = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection", "count");
        set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection", "count", parseInt(connectionCount) - 1);
        set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection", "number", parseInt(connectionCount) - 2);
        // Reorganize the datatbase
        var objList = get_xml_classe_objects(doc, "ob_ssh");
        var count = 0;
        for (var i = 0; i < objList.length; i++) {
            if (objList[i].getAttribute("name").match(RegExp("connection_"))) {
                objList[i].setAttribute("name", "connection_" + count);
                count++;
            }
        }
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(doc));
        openbexi_savePrivateData(null);
        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_publish_page, 'maximize');
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.removeSftpConnection()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.addNewSftp = function (event) {
    try {
        var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var connectionCount = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection", "count");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connectionCount, "website", "website" + connectionCount);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connectionCount, "host", "host" + connectionCount);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connectionCount, "user", "");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connectionCount, "passwd", "");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connectionCount, "PublicKey", "ssh-dss");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connectionCount, "SocketTimeout", "30000");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connectionCount, "path", "/");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection", "count", parseInt(connectionCount) + 1);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection", "connected", "false");
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(privateDoc));
        openbexi_savePrivateData(event);
        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_publish_page, 'maximize');

        if (document.getElementById("bexicontext_connection"))    document.getElementById("bexicontext_connection").value = connectionCount;
        if (document.getElementById("bexicontext_website"))    document.getElementById("bexicontext_website").value = "website" + connectionCount;
        if (document.getElementById("bexicontext_hostname"))    document.getElementById("bexicontext_hostname").value = "host" + connectionCount;
        if (document.getElementById("bexicontext_username"))    document.getElementById("bexicontext_username").value = "";
        if (document.getElementById("bexicontext_passwd"))    document.getElementById("bexicontext_passwd").value = "";
        if (document.getElementById("bexicontext_PublicKey"))    document.getElementById("bexicontext_PublicKey").value = "ssh-dss";
        if (document.getElementById("bexicontext_SocketTin"))    document.getElementById("bexicontext_SocketTin").value = "30000";
        if (document.getElementById("bexicontext_path"))    document.getElementById("bexicontext_path").value = "/";
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.addNewSftp()", "Exception:" + e.message);
    }

}
openbexi_navigator.prototype.getSftpObjects = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        var website = "";
        var hostname = "";
        var user = "";
        var passwd = "";
        var PublicKey = "ssh-dss";
        var SocketTimeout = "30000";
        var path = "";
        var connected = "false";
        //Look for sftp file already se up in OPENBEXI_PRIVATE_CONTEXT_XML
        var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var connectionCount = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection", "count");
        if (connectionCount == null || connectionCount == "") {
            connectionCount = 0;
            ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection", "count", 0);
        }
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount", connectionCount);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectMaxCount", parseInt(connectionCount));
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "status", "text", "done");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", this.divName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "sftpinit");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        for (var j = 0; j < parseInt(connectionCount); j++) {
            try {
                website = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "website");
                hostname = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "host");
                user = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "user");
                passwd = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "passwd");
                PublicKey = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "PublicKey");
                SocketTimeout = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "SocketTimeout");
                path = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "path");
                connected = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + j, "connected");

                doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "website", website.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "host", hostname.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "user", user.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "passwd", passwd.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "PublicKey", PublicKey.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "SocketTimeout", SocketTimeout.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "path", path.ob_trim());
                connected = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + j, "connected", connected.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file_" + j, "filename", hostname.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file_" + j, "type", "dir");
            } catch (e) {
                __openbexi_debugC("openbexi_navigator.prototype.getSftpObjects()", "Exception:" + e.message);
            }
        }
        return doc;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getSftpObjects()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.set_pusblish_data = function (connection_number) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.set_pusblish_data(" + connection_number + ")", "Info:");

        // Check if the page has already be published
        var website = "";
        var hostname = "";
        var user = "";
        var passwd = "";
        var PublicKey = "";
        var SocketTimeout = "";
        var path = "";

        var doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        if (connection_number == null)
            connection_number = openbexi_getPageData(null, "ob_ssh", "connection", "number");
        if (connection_number == "")
            connection_number = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection", "number");
        else
            openbexi_updatePageData(null, "ob_ssh", "connection", "number", connection_number);

        website = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "website");
        hostname = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "host");
        user = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "user");
        passwd = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "passwd");
        PublicKey = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "PublicKey");
        SocketTimeout = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "SocketTimeout");
        path = get_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "path");

        if (document.getElementById("bexicontext_connection"))    document.getElementById("bexicontext_connection").value = connection_number;
        if (document.getElementById("bexicontext_website"))    document.getElementById("bexicontext_website").value = website.ob_trim();
        if (document.getElementById("bexicontext_hostname"))    document.getElementById("bexicontext_hostname").value = hostname.ob_trim();
        if (document.getElementById("bexicontext_username"))    document.getElementById("bexicontext_username").value = user.ob_trim();
        if (document.getElementById("bexicontext_passwd"))    document.getElementById("bexicontext_passwd").value = passwd.ob_trim();
        if (document.getElementById("bexicontext_PublicKey"))    document.getElementById("bexicontext_PublicKey").value = PublicKey.ob_trim();
        if (document.getElementById("bexicontext_SocketTin"))    document.getElementById("bexicontext_SocketTin").value = SocketTimeout.ob_trim();
        if (document.getElementById("bexicontext_path"))    document.getElementById("bexicontext_path").value = path.ob_trim();
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.set_pusblish_data()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.open_FTPBrowser = function (ob_menu) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.open_FTPBrowser(" + ob_menu + ")", "Info:");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.open_FTPBrowser()", "Exception:" + e.message);
    }
}
function openbexi_publish_project_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_publish_project_CB(" + responseXML + ")", "Info:");

    } catch (e) {
        __openbexi_debugC("openbexi_publish_project_CB()", "Exception:" + e.message);
    }
}

var go_error_popup;

function openbexi_popup_status(responseXML, ticket_id) {

    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var count_issue = 0;
    var count_page = 0;
    var status_pages = "";
    var number = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection", "number");
    var message;
    var downlod_time = ob_get_ticket_download_time(ticket_id);

    while ((message = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "status_" + count_page)) != "") {
        if (count_page == 0)   message = message + "      ( Download time:" + downlod_time + " sec. )";
        if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_" + count_page) == "warning")
            status_pages += "<div><img src='gif/warning_x16.png'><b>" + message + "</b></div>";
        else if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_" + count_page) == "error")
            status_pages += "<div><img src='gif/error_x16.png'><b>" + message + "</b></div>";
        else
            status_pages += "<div><img src='gif/info_x16.png'><b>" + message + "</b></div>";
        while (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "status_" + count_page + "_" + count_issue) != "") {
            status_pages += "<div>" + get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "status_" + count_page + "_" + count_issue) + "</div></br>";
            count_issue++;
        }
        count_page++;
    }

    if (count_page == 0 && count_issue == 0) return;
    var error_popup = document.getElementById("ob_error_popup");
    var error_popup_txt = document.getElementById("ob_error_popup_txt");
    error_popup.style.visibility = "visible";
    error_popup.style.zIndex = 99999;
    error_popup_txt.innerHTML = status_pages;
    var fade_indexBg = 15;

    function fadeInBg(error_popup) {
        openbexi_opacity(error_popup, fade_indexBg);
        fade_indexBg += 8;
        go_error_popup = setTimeout(function () {
            fadeInBg(error_popup);
        }, 70);
        if (fade_indexBg >= 96) {
            clearTimeout(go_error_popup);
        }
    }

    fadeInBg(error_popup);
}

function openbexi_check_status(responseXML, ticket_id) {

    var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
    var status = ob_check_tickets(ticket_id);

    if (!status) {
        openbexi_popup_status(responseXML, ticket_id);
        openbexi_unloading2();
        return status;
    }
    return true;
}

function openbexi_get_sftp_server_info_CB(responseXML, ob_menu) {
    try {
        __openbexi_debugC("openbexi_get_sftp_server_info_CB(responseXML)", "Info:");

        var ob_doc;
        var icon_status = "loading";
        var number_ftp;
        var number;
        var file_max_count = 0;
        var file_count = 0;
        if (responseXML) {
            icon_status = "none";
            ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

            if (!openbexi_check_status(responseXML)) return;

            var project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "project");
            var status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
            number = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection", "number");
            var status_connection = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "status_0");
            var ticket_id = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "ticket", "id");
            var website = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "website");
            file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
            file_max_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");

            if (openbexiNavigator.mode == "get_sftp_server_info")
                if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_0") == "warning")
                    openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "warning", "40px");
                else if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_0") == "error")
                    openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "error", "40px");
                else
                    openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "info", "40px");


            if (openbexiNavigator.mode == "publish2server") {
                if (status == "ok") {
                    openbexi_unloading2();
                    if (document.getElementById('ob_menu_RequestBrowser') != null && document.getElementById('ob_menu_RequestBrowser').style.visibility != "hidden")
                        openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', null, 'hidden');
                    openbexiNavigator.top_frame_message("Webpage \"" + openbexiNavigator.webPageName + "\" successfully published", "40px", "info");
                }
                else {
                    if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_0") == "warning")
                        openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "warning", "40px");
                    else if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_0") == "error")
                        openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "error", "40px");
                    else
                        openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "info", "40px");
                    openbexi_popup_status(responseXML, ticket_id);
                    openbexi_unloading2();
                }
                openbexi_savePrivateData(null);
                return;
            }
            if (openbexiNavigator.mode == "publish_project2server") {
                if (status == "ok") {
                    openbexi_unloading2();
                    if (document.getElementById('ob_menu_RequestBrowser') != null && document.getElementById('ob_menu_RequestBrowser').style.visibility != "hidden")
                        openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', null, 'hidden');
                    openbexiNavigator.top_frame_message("Project \"" + openbexiNavigator.projectName + "\" successfully published", "40px", "info");
                    return;
                } else {
                    //openbexi_popup_status(responseXML, ticket_id);
                    openbexi_popup_status(responseXML, ticket_id);
                    openbexi_unloading2();
                    if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_0") == "warning")
                        openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "warning", "40px");
                    else if (get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "type_0") == "error")
                        openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "error", "40px");
                    else
                        openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", status_connection, "info", "40px");
                    return;
                }
            }
        }
    }
    catch (e) {
        __openbexi_debugC("openbexi_get_sftp_server_info_CB()", "Exception:" + e.message);
    }

    //Update FTP tree
    try {

        var ftp_objects = openbexiNavigator.getSftpObjects(null);
        var private_doc = openbexiNavigator.getObjects(private_doc, ftp_objects);
        number_ftp = get_xml_classe_object_attribut_value(private_doc, "ob_explorer", "file", "objectCount");

        if (number_ftp == "") {
            __openbexi_debugC("openbexi_get_sftp_server_info_CB() Exception:", number_ftp);
            number_ftp = 0;
            alert("Sorry, no database found.");
        }

        var ob_start = 0;
        var ob_end = parseInt(number_ftp);

        var FTP;
        var extend_FTP = "0";
        var keep_id_page = 0;
        var FTPBrowser_tree = "[\n";

        for (var j = ob_start; j < ob_end; j++) {
            try {
                FTP = get_xml_classe_object_attribut_value(private_doc, "ob_explorer", "file_" + j, "filename");
                if (j == parseInt(number)) extend_FTP = FTP + j;
                FTPBrowser_tree += " {\n";
                if (j == 0)
                //add new FTP connection
                    FTPBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.addNewSftp(); >' + FTP + '</b>' + "',\n";
                else
                    FTPBrowser_tree += " label: '" + '<b style="cursor:pointer;" onclick=openbexiNavigator.set_pusblish_data(' + j + ');openbexiNavigator.publish("get_sftp_server_info"); >' + FTP + '</b>' + "',\n";
                FTPBrowser_tree += " id: '" + j + FTP + "',\n";
                FTPBrowser_tree += " project: '" + FTP + "',\n";
                FTPBrowser_tree += " status: '__FTP',\n";
                FTPBrowser_tree += " children: [\n";
                if (j == parseInt(number)) {

                    FTPBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.set_pusblish_data(' + j + ');openbexiNavigator.publish("get_sftp_server_info");>' + "<b>Project:  " + " " + openbexiNavigator.projectName + '</b></a>' + "', id: '" + j + openbexiNavigator.projectName + "' , ftp_name: '" + FTP + "', status: '" + "__project" + "'},\n";

                    var webPage;
                    var countWebPage = 0;
                    if (parseInt(file_count) == 0) file_count = 1;
                    for (var k = 0; k < parseInt(file_count); k++) {
                        webPage = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + k, "filename");
                        var type = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + k, "type");
                        if (type == "web") {
                            countWebPage++;
                            if (openbexiNavigator.webPageName + ".html" == webPage) {
                                keep_id_page = k;
                                FTPBrowser_tree += " { label: '" + '<a style=" background: url(gif/fading_background_12_H.png); style="cursor:pointer;" >' + webPage + '</a>' + "', id: '" + k + j + webPage + "' , ftp_name: '" + FTP + "', status: '" + "none" + "'},\n";
                            } else {
                                FTPBrowser_tree += " { label: '" + '<a style="  style="cursor:pointer;" >' + webPage + '</a>' + "', id: '" + k + j + webPage + "' , ftp_name: '" + FTP + "', status: '" + "none" + "'},\n";
                            }
                        }
                    }
                    if (countWebPage == 0) {
                        webPage = "No_web_page_found";
                        FTPBrowser_tree += " { label: '" + '<a style="  style="cursor:pointer;" >' + "No web page found" + '</a>' + "', id: '" + webPage + "' , ftp_name: '" + FTP + "', status: '" + "none" + "'},\n";
                    }
                }
                FTPBrowser_tree += " ]\n";
                if (j != ob_end - 1) {
                    FTPBrowser_tree += " },\n";
                } else {
                    FTPBrowser_tree += " }\n";
                }
            } catch (e1) {
                __openbexi_debugC("openbexi_get_sftp_server_info_CB()", "Exception:" + e1.message);
            }
        }
        FTPBrowser_tree += "];";
        if (openbexiNavigator.FTPBrowser_tree_first_start) {
            openbexiNavigator.FTPBrowser_tree_first_start = false;
            openbexiNavigator.FTPBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(FTPBrowser_tree), "ob_menu_RequestBrowser_sub_left", "FTPBrowser_tree", null, undefined, undefined);
        } else
            openbexiNavigator.FTPBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(FTPBrowser_tree), "ob_menu_RequestBrowser_sub_left", "FTPBrowser_tree", null, undefined, extend_FTP);

        if (responseXML != null) {
            if (openbexiNavigator.mode == "publish2server") openbexiNavigator.publish('get_sftp_server_info2');
            if (openbexiNavigator.mode == "publish_project2server") openbexiNavigator.publish('get_sftp_server_info2');
        }

    } catch (e) {
        __openbexi_debugC("openbexi_get_sftp_server_info_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

openbexi_navigator.prototype.get_sftp_server_info = function () {
    try {

        var connection_number;
        if (document.getElementById("bexicontext_connection"))    connection_number = document.getElementById("bexicontext_connection").value;

        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "sftp");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "html");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");

        doc = set_xml_classe_object_attribut_value(doc, "system", "command", "text", "cd .");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", "project/" + this.projectName);

        // Look for and set up connection
        var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var website2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "website");
        var host2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "host");
        var user2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "user");
        var passwd2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "passwd");
        var PublicKey2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "PublicKey");
        var SocketTimeout2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "SocketTimeout");
        var path2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "path");

        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection", "number", connection_number);
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "website", website2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "host", host2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "user", user2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "passwd", passwd2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "PublicKey", PublicKey2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "SocketTimeout", SocketTimeout2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "path", path2.ob_trim());

        var ob_xml = openbexi_get_xmlString(doc);
        try {
            var mode_sync = openbexi_synchron();
            return openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_get_sftp_server_info_CB, "ob_menu_RequestBrowser_head", "Browsing host ...");
        } catch (e) {
            this.status("Sorry, cannot publish the page ...", "orange");
            __openbexi_debugC("openbexi_navigator.prototype.publish()", "Exception:" + e.message);
            return null;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.publish()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.publish2server = function (type) {
    try {
        var count = 0;
        var connection_number;
        if (document.getElementById("bexicontext_connection"))    connection_number = document.getElementById("bexicontext_connection").value;


        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);

        if (type == "openbexi_publishProjectRequest")
            set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_publishProjectRequest");
        else {
            set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_publishRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file_" + count, "name", this.HTML_pageName);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file_" + count, "type", "web");
        }
        var pageDoc = openbexi_get_documentElement(OPENBEXI_PAGES_DATA_XML, "text/xml");

        // Look for and set up connection
        var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var website2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "website");
        var host2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "host");
        var user2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "user");
        var passwd2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "passwd");
        var PublicKey2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "PublicKey");
        var SocketTimeout2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "SocketTimeout");
        var path2 = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection_" + connection_number, "path");

        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection", "number", connection_number);
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "website", website2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "host", host2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "user", user2);
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "passwd", passwd2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "PublicKey", PublicKey2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "SocketTimeout", SocketTimeout2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + connection_number, "path", path2.ob_trim());
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "remotedir", "path", path2);

        openbexiNavigator.load_timeout = 30000;
        this.ticket_id = parseInt(this.ticket_id) + 1;
        var ticket = new openbexi_ticket(this.ticket_id, openbexiNavigator.load_timeout, "openbexi_publishProjectRequest");
        ob_save_tickets(ticket);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "ticket", "id", this.ticket_id);

        var ob_xml = openbexi_get_xmlString(doc);
        try {
            var mode_sync = openbexi_synchron();
            return openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_get_sftp_server_info_CB, "ob_menu_RequestBrowser_head", "Publishing ...");
        } catch (e) {
            if (type == "openbexi_publishProjectRequest") {
                this.status("Sorry, cannot publish the project ...", "orange");
                __openbexi_debugC("openbexi_navigator.prototype.publish_project2server()", "Exception:" + e.message);
            } else {
                this.status("Sorry, cannot publish the page ...", "orange");
                __openbexi_debugC("openbexi_navigator.prototype.publish2server()", "Exception:" + e.message);
            }
            return null;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.publish2server()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.publish = function (action) {
    try {
        this.set_mode(action);

        if (action == 'publish2server') {
            this.publish2server("openbexi_publishRequest");
            return;
        }
        if (action == 'publish_project2server') {
            this.publish2server("openbexi_publishProjectRequest");
            return;
        }
        if (action == 'get_sftp_server_info' || action == 'get_sftp_server_info2') {
            this.get_sftp_server_info();
            return;
        }
        // Save before publishing
        if (action == 'save_before_publishing' || action == 'save_project_before_publishing') {
            this.set_mode(action);
            openbexi_savePageData(null);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.publish()", "Exception:" + e.message);
    }
}
;
//###################################################################
//SAVE
openbexi_navigator.prototype.save_project = function (event, objects) {
    try {
        openbexi_stopEventPropagation(event);
        ob_undofadeInBody();
        if (this.working) return;

        if (document.getElementById('ob_menu_FileBrowser') != null && document.getElementById('ob_menu_FileBrowser').style.visibility != "minimize")
            openbexiNavigator.window_factory(null, 'ob_menu_FileBrowser', null, "minimize");

        if (document.getElementById("ob_menu_RequestBrowser_head") != null) {
            if (objects == undefined) {
                // Requesting input from user before saving the current page via ob_menu_RequestBrowser
                //this.window_factory(event, 'ob_menu_RequestBrowser', ob_save_project_page_name, 'maximize');
                var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");
                if (openbexiNavigator.HTML_pageName == "template.html") {
                    ob_savePage.ob_state.html = '<label>Saving the WEB template page name for the project ' + openbexiNavigator.projectName + '.</label><br />' +
                            '<div>' +
                            '<b><label class="ob_label">project :</label></b><input class="ob_textarea" id="ob_savePage_Project" type="text" name="ob_savePage_Project" readonly size="40" value="' + openbexiNavigator.projectName + '"><br />' +
                            '<b><label class="ob_label">WEB page:</label></b><input class="ob_textarea" id="ob_savePage_WEB_page" type="text" name="ob_savePage_WEB_page" readonly size="40" value="' + openbexiNavigator.HTML_pageName + '">' +
                            '<div><br />';
                } else {
                    if (navigator_mode == "ob_template") {
                        ob_savePage.ob_state.html = '<label>Please enter the template page name.</label><br />' +
                                '<label>Otherwise the default name will be: \"no_name.html\": </label><br /><br />' +
                                '<div>' +
                                '<b><label class="ob_label">Template category:</label></b><input class="ob_textarea" id="ob_savePage_Project" type="text" name="ob_savePage_Project" readonly size="40" value="' + openbexiNavigator.projectName + '"><br />' +
                                '<b><label class="ob_label">Template page:</label></b><input class="ob_textarea" id="ob_savePage_WEB_page" type="text" name="ob_savePage_WEB_page" size="40" value="' + openbexiNavigator.HTML_pageName + '">' +
                                '<div><br />';
                    } else {
                        ob_savePage.ob_state.html = '<label>Please enter the WEB page name.</label><br />' +
                                '<label>Otherwise the default name will be: \"no_name.html\": </label><br /><br />' +
                                '<div>' +
                                '<b><label class="ob_label">project :</label></b><input class="ob_textarea" id="ob_savePage_Project" type="text" name="ob_savePage_Project" readonly size="40" value="' + openbexiNavigator.projectName + '"><br />' +
                                '<b><label class="ob_label">WEB page:</label></b><input class="ob_textarea" id="ob_savePage_WEB_page" type="text" name="ob_savePage_WEB_page" size="40" value="' + openbexiNavigator.HTML_pageName + '">' +
                                '<div><br />';
                    }
                }
                openbexiNavigator.prompt(null, ob_savePage);
            }
            else {
                // Input from user is done, get user input from objects and all input fields
                this.getData_from_RequestBrowser(objects);
                // Now input user can be read from OPENBEXI_PRIVATE_CONTEXT_XML via openbexi_getWebPrivateData
                this.projectName = openbexi_getWebPrivateData(null, "bexicontext", "project", "name");
                var pageName = openbexi_getWebPrivateData(null, "bexicontext", "page", "name");
                // The web page has been remamed
                if (pageName != this.webPageName) {
                    ob_setDirty_flag(true);
                    this.set_webPageName(pageName);
                }

                // Ready for saving web page
                this.set_HTML_pageName(pageName);
                openbexi_save_HTML_page(false);
            }
        }
        //__openbexi_debugC("openbexi_navigator.prototype.save_project()", "Info:" + " projectName=" + this.projectName + " " + pageName + "=" + pageName);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.save_project()", "Exception:" + e.message);
    }
    //__openbexi_debugC("openbexi_navigator.prototype.save_project()", "html:" + body.innerHTML);
}
openbexi_navigator.prototype.save_on = function () {
    try {
        this.top_frame_message("Save", "125px");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.save_on()", "Exception:" + e.message);
    }
}
//###################################################################
//PREVIEW
openbexi_navigator.prototype.preview = function (event) {
    try {
        if (this.HTML_pageName == "no_name.html")
            this.prompt(event, ob_preview, null);
        else {
            ob_undofadeInBody();
            openbexi_save_HTML_page(true, true, false);
            ob_setDirty_flag(true);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.preview()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.preview_on = function () {
    try {
        this.top_frame_message(openbexi_lang("Preview"), "216px");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.preview_on()", "Exception:" + e.message);
    }
}
//###################################################################
//WIZARD
openbexi_navigator.prototype.wizard = function (event) {
    openbexi_stopEventPropagation(event);
    if (this.working) return;
    if (getSelectedBexiObj(null) == openbexiBody)
        this.window_factory(null, 'ob_menu_RequestBrowser', ob_body_wizard, 'maximize');
    else if (getSelectedBexiObj(null).type == "openbexi_button")
        this.window_factory(null, 'ob_menu_RequestBrowser', ob_button_wizard, 'maximize');
    else
        alert("Sorry, not yet implemented ...");

}
openbexi_navigator.prototype.wizard_on = function () {
    try {
        document.getElementById("ob_frame_top_img1").src = "gif/wizard_on_x32.png";
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.wizard()", "Exception:" + e.message);
    }
}
//###################################################################
//CSS
openbexi_navigator.prototype.open_css = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        this.window_factory(event, 'ob_menu_CSS', null, 'minimize');
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.css_on()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.css_on = function () {
    try {
        this.top_frame_message("CSS", "840px", "info");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.css_on()", "Exception:" + e.message);
    }
}
//###################################################################
//TRASH
openbexi_navigator.prototype.saveMark_RequestBrowser_tree = function () {
    try {
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.saveMark_RequestBrowser_tree()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.deleteMark_RequestBrowser_tree = function (j, k, ob_menu) {
    //alert("openbexi_navigator.prototype.deleteMark_RequestBrowser_tree j="+j+"  k="+k+"  "+ob_menu+"\nthis.RequestBrowser_json_tree[j].children[k].status="+this.RequestBrowser_json_tree[j].children[k].status+"\nid="+this.RequestBrowser_json_tree[j].children[k].id);
    try {
        if (k == -1)
            if (this.RequestBrowser_json_tree[j].status == "removed")
                this.RequestBrowser_json_tree[j].status = "none";
            else
                this.RequestBrowser_json_tree[j].status = "removed";
        else if (this.RequestBrowser_json_tree[j].children[k].status == "removed")
            this.RequestBrowser_json_tree[j].children[k].status = "none";
        else
            this.RequestBrowser_json_tree[j].children[k].status = "removed";
        //alert("openbexi_navigator.prototype.deleteMark_RequestBrowser_tree j="+j+"  k="+k+"  "+ob_menu+"\nthis.RequestBrowser_json_tree[j].children[k].status="+this.RequestBrowser_json_tree[j].children[k].status+"\nid="+this.RequestBrowser_json_tree[j].children[k].id+"\nproject="+this.RequestBrowser_json_tree[j].children[k].project_web_page_name);

        this.create_tree("rawdata", this.RequestBrowser_json_tree, ob_menu, null, undefined, null, j + this.projectName);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.deleteMark_RequestBrowser_tree()", "Exception:" + e.message);
    }
}
function openbexi_save_template_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_save_template_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_save_template_CB bug ???");
            __openbexi_debugC("openbexi_save_template_CB()", " Exception: No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_save_template_CB()", "Info: status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_save_template_CB()", "Info: appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_save_template_CB()", "Exception: " + exception);

        var ob_menu = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "ob_menu");
        if (ob_menu == "") __openbexi_debugC("openbexi_save_template_CB()", "Warning: no ob_menu found");
        if (appli_status == "ok") {
            openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", "TemplateCreated", "info", "40px");
        } else if (appli_status == "TemplateAlreadyExit") {
            openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", appli_status, "warning", "40px");
            var answer = prompt(openbexi_lang(appli_status) + "\nDo you want to overwrite the template?", "yes");
            if (answer == "yes") {
                openbexiNavigator.open_project(null, "openbexi_createTemplateCategoryRequest_overwrite");
            } else {
                openbexiNavigator.open_project(null, "openbexi_createTemplateCategoryRequest_no_overwrite");
            }
            openbexi_unloading2();
            return;
        } else {
            openbexiNavigator.frame_message("ob_menu_RequestBrowser_text", appli_status, "error", "40px");
            openbexi_unloading2();
            return;
        }
        openbexiNavigator.browse_CSS(null, "ob_template_style", null, true);
        //openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_save_as_template, 'hidden');

    } catch (e) {
        __openbexi_debugC("openbexi_save_template_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

;
function openbexi_delete_or_save_project_CB(responseXML) {
    try {
        __openbexi_debugC("openbexi_delete_or_save_project_CB(" + responseXML + ")", "Info:");

        if (responseXML == null || responseXML == "") {
            if (openbexiNavigator) openbexiNavigator.status("openbexi_delete_or_save_project_CB bug ???");
            __openbexi_debugC("openbexi_delete_or_save_project_CB()", " Exception: No answer fron the server");
            openbexi_unloading2();
            return;
        }

        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");

        var status = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text");
        if (status != "" && status != "done") __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Info: status=" + status);

        var appli_status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (appli_status != "") __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Info: appli_status=" + appli_status);

        var exception = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "exception");
        if (exception != "") __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Exception: " + exception);

        var ob_menu = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "ob_menu");
        if (ob_menu == "") __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Warning: no ob_menu found");

        var file_count = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        if (file_count == "") __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Warning: no project found");
        var ob_end = parseInt(file_count);

        var path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        if (path == "") __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Warning: no project path found");
        openbexiNavigator.path = path;

        var mode = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "mode");
        if (mode == "") __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Warning: mode no found");

        var RequestBrowser_tree = "[\n";
        var project;
        var keep_id_project;
        var keep_id_page;

        for (var j = 0; j < ob_end; j++) {
            var k = -1;
            // No up directory if list driver case or certain cases
            try {
                project = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "filename");
                RequestBrowser_tree += " {\n";
                if (mode == "Delete")
                    RequestBrowser_tree += " label: '" + '<a style="cursor:pointer;"  ><b>' + project + '<b></a>' + "',\n";
                else
                    RequestBrowser_tree += " label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.saveMark_RequestBrowser_tree(\"' + j + '\",\"' + k + '\",\"' + ob_menu + '\") ><b>' + project + '<b></a>' + "',\n";

                RequestBrowser_tree += " id: '" + j + project + "',\n";
                RequestBrowser_tree += " project: '" + project + "',\n";
                if (openbexiNavigator.projectName == project) keep_id_project = j;
                RequestBrowser_tree += " status: '" + "none" + "',\n";
                RequestBrowser_tree += " children: [\n";
                var maxWebPages = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project, "objectMaxCount");
                var webPage;
                if (parseInt(maxWebPages) == 0)maxWebPages = 1;
                for (k = 0; k < parseInt(maxWebPages); k++) {
                    webPage = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", project + "_" + k, "filename");
                    if (webPage == "")  webPage = "no_name.html";
                    if (mode == "Delete") {
                        if (openbexiNavigator.projectName == project && openbexiNavigator.webPageName + ".html" == webPage) keep_id_page = k;
                        if (k != parseInt(maxWebPages) - 1)
                            RequestBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.deleteMark_RequestBrowser_tree(\"' + j + '\",\"' + k + '\",\"' + ob_menu + '\") >' + webPage + '</a>' + "', id: '" + j + k + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                        else
                            RequestBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.deleteMark_RequestBrowser_tree(\"' + j + '\",\"' + k + '\",\"' + ob_menu + '\") >' + webPage + '</a>' + "', id: '" + j + k + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                    } else {
                        if (openbexiNavigator.projectName == project && openbexiNavigator.webPageName + ".html" == webPage) {
                            if (k != parseInt(maxWebPages) - 1)
                                RequestBrowser_tree += " { label: '" + '<a style=" background: url(gif/fading_background_12_H.png);cursor:pointer;" onclick=openbexiNavigator.saveMark_RequestBrowser_tree(\"' + j + '\",\"' + k + '\",\"' + ob_menu + '\") >' + webPage + '</a>' + "', id: '" + j + k + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                            else
                                RequestBrowser_tree += " { label: '" + '<a style=" background: url(gif/fading_background_12_H.png);cursor:pointer;" onclick=openbexiNavigator.saveMark_RequestBrowser_tree(\"' + j + '\",\"' + k + '\",\"' + ob_menu + '\") >' + webPage + '</a>' + "', id: '" + j + k + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                        } else {
                            if (k != parseInt(maxWebPages) - 1)
                                RequestBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.saveMark_RequestBrowser_tree(\"' + j + '\",\"' + k + '\",\"' + ob_menu + '\") >' + webPage + '</a>' + "', id: '" + j + k + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                            else
                                RequestBrowser_tree += " { label: '" + '<a style="cursor:pointer;" onclick=openbexiNavigator.saveMark_RequestBrowser_tree(\"' + j + '\",\"' + k + '\",\"' + ob_menu + '\") >' + webPage + '</a>' + "', id: '" + j + k + webPage + "' , project_web_page_name: '" + webPage + "', status: '" + "none" + "'},\n";
                        }
                    }
                }
                RequestBrowser_tree += " ]\n";
                if (j != ob_end - 1) {
                    RequestBrowser_tree += " },\n";
                } else {
                    RequestBrowser_tree += " }\n";
                }
            } catch (e1) {
                __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Exception:" + e1.message);
            }
        }

        RequestBrowser_tree += "];";
        openbexiNavigator.RequestBrowser_json_tree = eval(RequestBrowser_tree);
        if (mode == "Delete") {
            // Delete mark and create the current page
            openbexiNavigator.deleteMark_RequestBrowser_tree(keep_id_project, keep_id_page, ob_menu);
        } else {
            // Create tree without mark
            setTimeout(function () {
                openbexiNavigator.RequestBrowser_tree = openbexiNavigator.create_tree("rawdata", eval(RequestBrowser_tree), ob_menu, null, null, true, keep_id_project + openbexiNavigator.projectName);
            }, 500);
        }
    }
    catch (e) {
        __openbexi_debugC("openbexi_delete_or_save_project_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

openbexi_navigator.prototype.deleteBodyWebPage = function (event, update_fileBrowser) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        openbexiBody.removeObjects();
        this.set_ob_menus_MaxLeft();
        if (document.getElementById('ob_menu_widget') != null && document.getElementById('ob_menu_widget').style.visibility != "hidden")
            this.window_factory(null, 'ob_menu_widget', null, 'hidden');
        if (document.getElementById('ob_menu_CSS') != null && document.getElementById('ob_menu_CSS').style.visibility != "hidden")
            this.window_factory(null, 'ob_menu_CSS', null, 'hidden');
        if (document.getElementById('ob_menu_widget') != null && document.getElementById('ob_menu_widget').style.visibility != "hidden")
            this.window_factory(null, 'ob_menu_widget', null, 'hidden');

        // Reload blank page with template if any
        if (update_fileBrowser == true) {
            ob_setDirty_flag(false);
            openbexi_save_bexicontext();
            if (openbexiNavigator.HTML_pageName != "template.html")
                if (openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode") == "ob_template")
                    openbexiNavigator.open_web_template_page(openbexiNavigator.templateCategory, openbexiNavigator.HTML_pageName, true);
                else
                    openbexiNavigator.open_web_project_page(openbexiNavigator.projectName, openbexiNavigator.HTML_pageName, true);
        } else {
            ob_setDirty_flag(true);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.deleteWebPage()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.deleteProjects = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        __openbexi_debugC("openbexi_navigator.prototype.deleteProjects(" + event + ")", "Info:");
        //ob_delete_WebPage.ob_state.html= '<label><b>Do you want to delete the WEB Page:</b></label><br /><label>'+ openbexiNavigator.HTML_pageName+'  </label>'
        //this.prompt(null, ob_delete_WebPage);
        this.window_factory(event, 'ob_menu_RequestBrowser', ob_delete_projects, 'maximize');
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.deleteProjects()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.deleteProjects_on = function () {
    try {
        this.top_frame_message("Trash", "920px");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.deleteProjects_on()", "Exception:" + e.message);
    }
}
//###################################################################
//OPEN - WIDGET - CSS -
openbexi_navigator.prototype.widget = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        this.window_factory(event, 'ob_menu_widget', null, 'minimize');
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.preview()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.widget_on = function () {
    try {
        //__openbexi_debugC("openbexi_navigator.prototype.widget_on()", "Info:");

        this.top_frame_message("Widgets", "735px");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.widget_on()", "Exception:" + e.message);
    }
}
//###################################################################
//MENU_EDITOR
openbexi_navigator.prototype.update_menu_editor = function (this_widget, enable) {
    try {
        if (enable) {
            if (document.getElementById("ob_sub_menu_editor").ob_type != this_widget.type) {
                __openbexi_debugC("openbexi_navigator.prototype.update_menu_editor(" + this_widget + "," + enable + ")", "Info:");
                document.getElementById("ob_sub_menu_editor").innerHTML = this_widget.get_editor();
                document.getElementById("ob_sub_menu_editor").ob_type = this_widget.type;
            }
        } else {
            if (document.getElementById("ob_sub_menu_editor").ob_type != openbexiBody.type) {
                __openbexi_debugC("openbexi_navigator.prototype.update_menu_editor(" + this_widget + "," + enable + ")", "Info:");
                document.getElementById("ob_sub_menu_editor").innerHTML = openbexiBody.get_editor();
                document.getElementById("ob_sub_menu_editor").ob_type = openbexiBody.type;
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.update_menu_editor()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.get_menu_editor = function (popupAttributes) {
    try {
        //__openbexi_debugC("openbexi_navigator.prototype.get_menu_editor( [popupAttributes] )", "Info:");

        var currentFcn = null;
        var str = '';
        var x = 0;
        var y = 10;
        if (popupAttributes.length > 6) {
            y = 2;
            x = 12;
        }

        for (var i = 0; i < popupAttributes.length; i++) {
            if (popupAttributes[i][0] != "sep") {
                if (i == 6) {
                    y = 50;
                    x = 12;
                }
                if (popupAttributes[i][1] != null && popupAttributes[i][2] != null && popupAttributes[i][3] != null) {
                    currentFcn = popupAttributes[i][1].replace("this", "getSelectedBexiObj(null)");
                    var text = openbexi_lang(popupAttributes[i][2]);
                    var img_down = popupAttributes[i][3].replace("_x48", "_down_x48");
                    var img_over = popupAttributes[i][3].replace("_x48", "_on_x48");
                    str += ' <div  class=\'ob_openbexi_global_background ob_menu_widget_box\' onmouseover="openbexiNavigator.top_frame_message(\'' + text + '\', \'420px\');_ob_menu_direction = \'none\'" style=" left:' + x + 'px;top:' + y + 'px;" ><img src ="' + popupAttributes[i][3] + '" ';
                    if (popupAttributes.length > 6)
                        str += ' style="width:40px ;height:40px';
                    else
                        str += ' style="width: ' + popupAttributes[i][4] + ';height:' + popupAttributes[i][5] + '"';
                    str += ' onmouseover="this.src=\'' + img_over + '\';" ';
                    str += ' onmouseout="this.src=\'' + popupAttributes[i][3] + '\';" ';
                    str += ' onmousedown="this.src=\'' + img_down + '\';" ';
                    str += ' onmouseup="this.src=\'' + popupAttributes[i][3] + '\';" ';
                    str += ' onclick="' + currentFcn + '\"><\/div>';
                }
                if (popupAttributes.length > 6)
                    x += 48;
                else
                    x += 52;
            }
        }
        if (popupAttributes.length > 6) {
            document.getElementById("ob_sub_menu_editor").style.width = 6 * (46) + "px";
            document.getElementById("ob_sub_menu_editor").style.left = "10px";
            document.getElementById("ob_sub_menu_editor").style.height = 90 + "px";
        } else {
            document.getElementById("ob_sub_menu_editor").style.width = x + "px";
            document.getElementById("ob_sub_menu_editor").style.height = 54 + "px";
            var w2 = parseInt(document.getElementById("ob_menu_editor").style.width) / 2;
            var w2sub = x / 2;
            if (w2 > w2sub)
                document.getElementById("ob_sub_menu_editor").style.left = w2 - w2sub + "px";
            else
                document.getElementById("ob_sub_menu_editor").style.left = "0px";
            ob_sub_menu_editor_current_left = document.getElementById("ob_sub_menu_editor").style.left;
        }
        return str;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.get_menu_editor()", "Exception:" + e.message);
    }
}
//###################################################################
// Build RequestBrowser content
openbexi_navigator.prototype.resize_RequestBrowser_body = function () {
    try {
        var head_height = 0;
        var width_window_left = 0;
        var height_window_foot = 0;
        var requestBrowser_w = parseInt(_ob_menu_RequestBrowser_w);
        var requestBrowser_h = parseInt(_ob_menu_RequestBrowser_h);
        if (document.getElementById("ob_menu_RequestBrowser_head"))head_height = parseInt(document.getElementById("ob_menu_RequestBrowser_head").style.height);

        if (document.getElementById("ob_menu_RequestBrowser_sub_left")) {
            document.getElementById("ob_menu_RequestBrowser_sub_left").style.top = 15 + head_height + "px";
            document.getElementById("ob_menu_RequestBrowser_sub_left").style.left = "0px";
            if (document.getElementById("ob_menu_RequestBrowser_sub_left").style.width.match(RegExp('%')))
                width_window_left = requestBrowser_w * parseInt(document.getElementById("ob_menu_RequestBrowser_sub_left").style.width.replace("%", "")) / 100;
            else
                width_window_left = parseInt(document.getElementById("ob_menu_RequestBrowser_sub_left").style.width);
            document.getElementById("ob_menu_RequestBrowser_sub_left").style.width = width_window_left + "px";
            document.getElementById("ob_menu_RequestBrowser_sub_left").style.height = requestBrowser_h + "px";
        }
        if (document.getElementById("ob_menu_RequestBrowser_sub_foot")) {
            document.getElementById("ob_menu_RequestBrowser_sub_foot").style.left = width_window_left + "px";
            if (document.getElementById("ob_menu_RequestBrowser_sub_foot").style.height.match(RegExp('%')))
                height_window_foot = requestBrowser_h * parseInt(document.getElementById("ob_menu_RequestBrowser_sub_foot").style.height.replace("%", "")) / 100;
            else
                height_window_foot = parseInt(document.getElementById("ob_menu_RequestBrowser_sub_foot").style.height);
            document.getElementById("ob_menu_RequestBrowser_sub_foot").style.top = requestBrowser_h - height_window_foot + "px";
            height_window_foot = requestBrowser_h - parseInt(document.getElementById("ob_menu_RequestBrowser_sub_foot").style.top);
            document.getElementById("ob_menu_RequestBrowser_sub_foot").style.height = height_window_foot + "px";
            document.getElementById("ob_menu_RequestBrowser_sub_foot").style.width = requestBrowser_w - width_window_left + "px";
        }

        if (document.getElementById("ob_menu_RequestBrowser_sub")) {
            document.getElementById("ob_menu_RequestBrowser_sub").style.top = head_height + "px";
            document.getElementById("ob_menu_RequestBrowser_sub").style.left = width_window_left + "px";
            document.getElementById("ob_menu_RequestBrowser_sub").style.height = requestBrowser_h - height_window_foot + "px";
            document.getElementById("ob_menu_RequestBrowser_sub").style.width = requestBrowser_w - width_window_left + "px";
            if (document.getElementById("ob_menu_RequestBrowser_sub_foot"))document.getElementById("ob_menu_RequestBrowser_sub_foot").style.top = head_height + parseInt(document.getElementById("ob_menu_RequestBrowser_sub").style.height) + "px";
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.resize_RequestBrowser_body()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.getData_from_RequestBrowser = function (objects) {
    var items;
    var tag;
    var div_id;
    var value;
    for (var i = 0; i < objects.length; i++) {
        tag = objects[i][0];
        div_id = objects[i][1];
        items = div_id.split("_");
        if (tag == "input" && items.length == 3) {
            value = document.getElementById(div_id).value;
            value = openbexi_system.openbexi_stringReplaceAll(value, " ", "");
            openbexi_updateWebPrivateData(null, items[0], items[1], items[2], value);
        }
    }
}
openbexi_navigator.prototype.populateData_to_RequestBrowser = function (objects) {
    var items;
    var tag;
    var div_id;
    var value;
    for (var i = 0; i < objects.length; i++) {
        tag = objects[i][0];
        div_id = objects[i][1];
        items = div_id.split("_");
        if (tag == "input" && items.length == 3) {
            if (div_id == "bexicontext_project_name")
                value = this.projectName;
            else if (div_id == "bexicontext_page_name")
                value = this.webPageName;
            else if (div_id == "ob_template_name")
                value = this.webPageName;
            else
                value = openbexi_getWebPrivateData(null, items[0], items[1], items[2], value);
            document.getElementById(div_id).value = value;
        }
    }
}
//###################################################################
//Window factory - Window manager

openbexi_navigator.prototype.window_factory = function (event, ob_menu, objects, window_status) {
    try {
        openbexi_stopEventPropagation(event);
        var canceled = false;
        // Hide slide if any
        if (document.getElementById("ob_slide_div0") != null)
            document.getElementById("ob_slide_div0").style.visibility = "hidden";
        if (document.getElementById("ob_slide_div1") != null)
            document.getElementById("ob_slide_div1").style.visibility = "hidden";
        if (document.getElementById("ob_slide_div2") != null)
            document.getElementById("ob_slide_div2").style.visibility = "hidden";
        if (document.getElementById("ob_slide_div3") != null)
            document.getElementById("ob_slide_div3").style.visibility = "hidden";
        if (document.getElementById("ob_slide_div4") != null)
            document.getElementById("ob_slide_div4").style.visibility = "hidden";
        if (document.getElementById("ob_slide_div5") != null)
            document.getElementById("ob_slide_div5").style.visibility = "hidden";
        if (document.getElementById("ob_slide_div6") != null)
            document.getElementById("ob_slide_div6").style.visibility = "hidden";
        if (document.getElementById("ob_slide_div7") != null)
            document.getElementById("ob_slide_div7").style.visibility = "hidden";

        // Check if it is necessary to run window_factory
        if (document.getElementById(ob_menu).style.visibility == "visible" && (document.getElementById(ob_menu + "_head").style.visibility == "visible") && window_status == "minimize") {
            __openbexi_debugC("openbexi_navigator.prototype.window_factory(" + event + ", " + ob_menu + " ,objects" + ", " + window_status + ")", "Info:Canceled");
            //return;
        }
        if (document.getElementById(ob_menu).style.visibility == window_status && (document.getElementById(ob_menu + "_head").style.visibility != "visible") && window_status != "hidden") {
            __openbexi_debugC("openbexi_navigator.prototype.window_factory(" + event + ", " + ob_menu + " ,objects" + ", " + window_status + ")", "Info:Canceled");
            return;
        }
        if (window_status == "hidden" || window_status == "headClicked" || window_status == "default") {
            __openbexi_debugC("openbexi_navigator.prototype.window_factory(" + event + ", " + ob_menu + " ,objects" + ", " + window_status + ")", "Info:Canceled");
            if (this.working) return;
        }
        //No autorized if object selected
        if (ob_menu == "ob_menu_widget" && window_status != "hidden") {
            if (getSelectedBexiObj(null).type != "openbexi_body" && getSelectedBexiObj(null).type != "openbexi_page" && getSelectedBexiObj(null).type != "openbexi_form" && getSelectedBexiObj(null).type != "openbexi_fisheyes") {
                __openbexi_debugC("openbexi_navigator.prototype.window_factory(" + event + ", " + ob_menu + " ,objects" + ", " + window_status + ")", "Info:Canceled");
                return;
            }
        }
        if (event != null)openbexi_stopEventPropagation(event);
        this.set_menu_focus(ob_menu);

        //Specific case for
        if (ob_menu == "ob_menu_PictureBrowser" && window_status == "default" && !document.getElementById(ob_menu + "_window_manager_img").src.match(RegExp("_full_"))) {
            this.browse_picture("", "dir", this.browse_picture_path, "tree", true, false);
            __openbexi_debugC("openbexi_navigator.prototype.window_factory(" + event + ", " + ob_menu + " ,objects" + ", " + window_status + ")", "Info:Canceled");
            return;
        }
        __openbexi_debugC("openbexi_navigator.prototype.window_factory(" + event + ", " + ob_menu + " ,objects" + ", " + window_status + ")", "Info:");

        if (ob_menu == "ob_menu_PictureBrowser" && (window_status == "hidden" || window_status == "minimize")) {
            openbexiNavigator.set_css_mode("none", null);
        }

        // If status equal default, then look for the current window status: maximize or minimize.
        // Switch to maximize if current window status already minimize, or Switch to minimize if current window status already maximize
        if (window_status == "default") {
            if (document.getElementById(ob_menu + "_window_manager_img").src.match(RegExp("_full_"))) {
                window_status = "maximize";
            } else {
                window_status = "minimize";
            }
        }
        if (window_status == "headClicked") {
            if (document.getElementById(ob_menu + "_window_manager_img").src.match(RegExp("_full_")))
                window_status = "minimize";
            else {
                __openbexi_debugC("openbexi_navigator.prototype.window_factory(" + event + ", " + ob_menu + " ,objects" + ", " + window_status + ")", "Info:Canceled");
                return;
            }
        }

        // Complete DHTML window set up if not already done
        this.dhtml_set_up(ob_menu);

        // Build and display the window ob_menu
        this.build_and_display_window(ob_menu, objects, window_status);

        // Make logo visible if needed
        this.logo_manager();

        // Set left for all open windows
        this.set_ob_menus_MaxLeft();

        // Set Z-index
        if (window_status != "hidden") openbexi_reset_all_z(document.getElementById(ob_menu), "ob_window_up");
        if (ob_menu == "ob_menu_RequestBrowser") {
            if (this.mode == "databaseArea")
                this.set_database_data(null);
            else
                this.set_pusblish_data(null);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.window_factory()", "Exception:" + e.message);
        return;
    }
    __openbexi_debugC("openbexi_navigator.prototype.window_factory()", "Info: Completed window_factory set up for " + ob_menu);
}
openbexi_navigator.prototype.window_list_manager = function (ob_menu, window_status) {
    try {
        // Push the current window at the end of the ob_minimize_menu_list
        var count = 0;
        var new_ob_minimize_menu_list = new Array();
        for (var i = 0; i < ob_minimize_menu_list.length; i++) {
            if (ob_menu != ob_minimize_menu_list[i] && document.getElementById(ob_minimize_menu_list[i] + "_window_manager_img").src.match("_full_") && document.getElementById(ob_minimize_menu_list[i] + "_head").style.visibility == "visible") {
                new_ob_minimize_menu_list[count] = ob_minimize_menu_list[i];
                count++;
            }
        }
        if ((window_status == "minimize" || window_status == "headClicked") && document.getElementById(ob_menu + "_head").style.visibility == "visible") {
            new_ob_minimize_menu_list[count] = ob_menu;
        }
        ob_minimize_menu_list = new_ob_minimize_menu_list;

        count = 0;
        var new_ob_maximize_menu_list = new Array();
        for (i = 0; i < ob_maximize_menu_list.length; i++) {
            if (ob_menu != ob_maximize_menu_list[i] && !document.getElementById(ob_maximize_menu_list[i] + "_window_manager_img").src.match("_full_") && document.getElementById(ob_maximize_menu_list[i] + "_head").style.visibility == "visible") {
                new_ob_maximize_menu_list[count] = ob_maximize_menu_list[i];
                count++;
            }
        }
        if ((window_status == "maximize" || window_status == "headClicked") && document.getElementById(ob_menu + "_head").style.visibility == "visible") {
            new_ob_maximize_menu_list[count] = ob_menu;
        }
        ob_maximize_menu_list = new_ob_maximize_menu_list;

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.window_list_manager()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.window_manager_up = function () {
    try {

        var tops = 0;
        var last_visible = null;
        for (var i = 0; i < ob_minimize_menu_list.length; i++) {
            if (dd.elements[ob_minimize_menu_list[i] + "_head"] != undefined) dd.elements[ob_minimize_menu_list[i] + "_head"].moveTo(parseInt(document.getElementById("ob_frame_top").style.width) + 3, parseInt(parseInt(document.getElementById("ob_menu_editor").style.top) + parseInt(document.getElementById("ob_menu_editor").style.height) + 2 + tops));
            tops += parseInt(document.getElementById(ob_minimize_menu_list[i] + "_head").style.height);
            document.getElementById(ob_minimize_menu_list[i]).style.visibility = "hidden";
            last_visible = ob_minimize_menu_list[i];
        }
        if (last_visible != null) {
            document.getElementById("ob_logo").style.visibility = "visible";
            document.getElementById(last_visible).style.visibility = "visible";
            this.move(last_visible);
            this.resize(last_visible);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.window_manager_list_update()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.window_set_status = function () {
    try {

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.window_set_status()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.dhtml_set_up = function (ob_menu) {
    try {
        //Set DHTML
        if (ob_menu == "ob_menu_widget") {
            if (!openbexiNavigator._ob_dhtml_widget) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_widget = false;
            }
        }
        if (ob_menu == "ob_menu_CSS") {
            if (!openbexiNavigator._ob_dhtml_CSS) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_CSS = true;
            }
        }
        if (ob_menu == "ob_menu_FileBrowser") {
            if (!openbexiNavigator._ob_dhtml_FileBrowser) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_FileBrowser = true;
            }
        }
        if (ob_menu == "ob_menu_PictureBrowser") {
            if (!openbexiNavigator._ob_dhtml_PictureBrowser) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_PictureBrowser = true;
            }
        }
        if (ob_menu == "ob_menu_TemplateBrowser") {
            if (!openbexiNavigator._ob_dhtml_TemplateBrowser) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_TemplateBrowser = true;
            }
        }
        if (ob_menu == "ob_menu_RequestBrowser") {
            if (!openbexiNavigator._ob_dhtml_RequestBrowser) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_RequestBrowser = true;
            }
        }
        if (ob_menu == "ob_menu_JavascriptBrowser") {
            if (!openbexiNavigator._ob_dhtml_JavascriptBrowser) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_JavascriptBrowser = true;
            }
        }
        if (ob_menu == "ob_menu_SQLBrowser") {
            if (!openbexiNavigator._ob_dhtml_SQLBrowser) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_SQLBrowser = true;
            }
        }
        if (ob_menu == "ob_menu_FTPBrowser") {
            if (!openbexiNavigator._ob_dhtml_FTPBrowser) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_FTPBrowser = true;
            }
        }
        if (ob_menu == "ob_menu_debugging") {
            if (!openbexiNavigator._ob_dhtml_debugging) {
                ADD_DHTML(ob_menu, ob_menu + "_head" + CURSOR_MOVE, ob_menu + "_resize" + CURSOR_SE_RESIZE);
                openbexiNavigator._ob_dhtml_debugging = true;
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.dhtml_set_up()", "Exception:" + e.message);
    }
    try {
        openbexi_set_draggable(ob_menu, false);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.dhtml_set_up()", "Exception:" + e.message);
    }

}
openbexi_navigator.prototype.window_manager_on = function (event, this_div) {
    try {
        // __openbexi_debugC("openbexi_navigator.prototype.window_manager_on(" + event + "," + this_div + ")", "Info:");

        if (document.getElementById(this_div.id).src.match(RegExp("full")))
            document.getElementById(this_div.id).src = "gif/window_manager_full_on_x32.png";
        else
            document.getElementById(this_div.id).src = "gif/window_manager_on_x32.png";
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.window_manager_on()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.window_manager_out = function (event, this_div) {
    try {
        // __openbexi_debugC("openbexi_navigator.prototype.window_manager_out(" + event + "," + this_div + ")", "Info:");

        if (document.getElementById(this_div.id).src.match(RegExp("full")))
            document.getElementById(this_div.id).src = "gif/window_manager_full_x32.png";
        else
            document.getElementById(this_div.id).src = "gif/window_manager_x32.png";
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.window_manager_out()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.logo_manager = function () {
    // Hide logo if last minimazed window open
    if (ob_minimize_menu_list.length < 1)
        document.getElementById("ob_logo").style.visibility = "hidden";
    else
        document.getElementById("ob_logo").style.visibility = "visible";
}
var obremoveTree;

function openbexi_remove_tree(ob_menu) {
    obremoveTree = setTimeout(function () {
        try {
            if (dojo.byId(ob_menu).innerHTML != "") {
                document.getElementById(ob_menu).innerHTML = "";
                clearTimeout(obremoveTree);
            }
        } catch (e1) {
            __openbexi_debugC("openbexi_navigator.prototype.openbexi_remove_tree()", "Exception:" + e1.message);
        }
    }, 1000);
}

openbexi_navigator.prototype.build_and_display_window = function (ob_menu, objects, status) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.build_and_display_window(" + ob_menu + "," + status + ")", "Info:");

        var h;
        var w;
        var x;
        var y;
        var ob_radius = "0.25em";
        var border;
        var body_objects;
        var body_objects_draggable = false;

        if (ob_menu == "ob_menu_CSS") {
            h = _ob_menu_CSS_h;
            w = _ob_menu_CSS_w;
            x = _ob_menu_CSS_x;
            y = _ob_menu_CSS_y;
            body_objects = ob_menu_CSS;
            if (status != "hidden") this.browse_CSS(null, null, null, false);

        }
        if (ob_menu == "ob_menu_FileBrowser") {
            h = _ob_menu_FileBrowser_h;
            w = _ob_menu_FileBrowser_w;
            x = _ob_menu_FileBrowser_x;
            y = _ob_menu_FileBrowser_y;
            body_objects = null;
            if (status != "hidden") this.open_project(ob_menu + "_sub", "Open");
        }
        if (ob_menu == "ob_menu_PictureBrowser") {
            h = _ob_menu_PictureBrowser_h;
            w = _ob_menu_PictureBrowser_w;
            x = _ob_menu_PictureBrowser_x;
            y = _ob_menu_PictureBrowser_y;
            if (status == "maximize") {
                body_objects_draggable = true;
                body_objects = ob_menu_pictures;
                document.getElementById(ob_menu).style.overflow = "visible";
            }
            else {
                body_objects = null;
                document.getElementById(ob_menu).style.overflow = "auto";
            }
            if (this.ob_menu_PictureBrowser_pager == null) {
                this.ob_menu_PictureBrowser_pager = new openbexi_pager(null, null, ob_menu, top, "2px", "25px", "15px", "23px", 10, "dynamic");
                document.getElementById(ob_menu + "_footer").appendChild(this.ob_menu_PictureBrowser_pager.div);
                this.ob_menu_PictureBrowser_pager.div.style.top = "8px";
                this.ob_menu_PictureBrowser_pager.hide();
                this.ob_menu_PictureBrowser_pager.posCurrentItem = 0;
                this.ob_menu_PictureBrowser_pager.pager_number = 0;
            }
        }
        if (ob_menu == "ob_menu_TemplateBrowser") {
            h = _ob_menu_TemplateBrowser_h;
            w = _ob_menu_TemplateBrowser_w;
            x = _ob_menu_TemplateBrowser_x;
            y = _ob_menu_TemplateBrowser_y;
            body_objects = null;
        }
        if (ob_menu == "ob_menu_RequestBrowser") {
            h = _ob_menu_RequestBrowser_h;
            w = _ob_menu_RequestBrowser_w;
            x = _ob_menu_RequestBrowser_x;
            y = _ob_menu_RequestBrowser_y;
            body_objects = objects;
        }
        if (ob_menu == "ob_menu_JavascriptBrowser") {
            h = _ob_menu_JavascriptBrowser_h;
            w = _ob_menu_JavascriptBrowser_w;
            x = _ob_menu_JavascriptBrowser_x;
            y = _ob_menu_JavascriptBrowser_y;
            body_objects = null;
            if (status == "minimize") openbexi_browse_JS_function(ob_menu + "_sub", null, null);
        }
        if (ob_menu == "ob_menu_SQLBrowser") {
            h = _ob_menu_SQLBrowser_h;
            w = _ob_menu_SQLBrowser_w;
            x = _ob_menu_SQLBrowser_x;
            y = _ob_menu_SQLBrowser_y;
            if (status == "maximize") {
                body_objects = objects;
                this.open_SQL_DataBase("ob_menu_RequestBrowser_sub_left");
            } else if (status == "hidden")
                body_objects = null;
            else {
                body_objects = null;
                this.open_SQL_DataBase("ob_menu_SQLBrowser_sub");
            }
        }
        if (ob_menu == "ob_menu_FTPBrowser") {
            h = _ob_menu_FTPBrowser_h;
            w = _ob_menu_FTPBrowser_w;
            x = _ob_menu_FTPBrowser_x;
            y = _ob_menu_FTPBrowser_y;
            body_objects = null;
        }
        if (ob_menu == "ob_menu_debugging") {
            h = _ob_menu_debugging_h;
            w = _ob_menu_debugging_w;
            x = _ob_menu_debugging_x;
            y = _ob_menu_debugging_y;
            body_objects = null;
            if (status != "hidden") {
                document.getElementById("ob_menu_debugging_exception_img").style.visibility = "visible";
                document.getElementById("ob_menu_debugging_error_img").style.visibility = "visible";
                document.getElementById("ob_menu_debugging_warning_img").style.visibility = "visible";
                document.getElementById("ob_menu_debugging_info_img").style.visibility = "visible";
                document.getElementById("ob_menu_debugging_classe_img").style.visibility = "visible";
                document.getElementById("ob_menu_debugging_function_img").style.visibility = "visible";
                document.getElementById("ob_menu_debugging_data_img").style.visibility = "visible";
                document.getElementById("ob_menu_debugging_event_img").style.visibility = "visible";

            }
        }
        if (ob_menu == "ob_menu_widget") {
            h = _ob_menu_widget_h;
            w = _ob_menu_widget_w;
            x = _ob_menu_widget_x;
            y = _ob_menu_widget_y;
            if (objects)
                body_objects = objects;
            else {
                if (getSelectedBexiObj(null).type != "openbexi_body" && getSelectedBexiObj(null).getPopupWidgets != undefined)
                    body_objects = getSelectedBexiObj(null).getPopupWidgets();
                else
                    body_objects = ob_menu_widget;

            }
            body_objects_draggable = true;
            if (this.ob_menu_widget_pager == null) {
                this.ob_menu_widget_pager = new openbexi_pager(null, null, ob_menu, top, "2px", "25px", "15px", "23px", 10, "dynamic");
                document.getElementById(ob_menu + "_footer").appendChild(this.ob_menu_widget_pager.div);
                this.ob_menu_widget_pager.div.style.top = "8px";
                this.ob_menu_widget_pager.hide();
            }
            this.ob_menu_widget_pager.posCurrentItem = 0;
            this.ob_menu_widget_pager.pager_number = 0;
            this.ob_menu_widget_pager.maxItems = ob_menu_widget.length;
        }
        if (status == "maximize") {
            document.getElementById(ob_menu + "_window_manager_img").src = "gif/window_manager_x32.png";

            document.getElementById(ob_menu).style.visibility = "visible";
            if (document.getElementById(ob_menu + "_sub")) document.getElementById(ob_menu + "_sub").style.visibility = "visible";
            if (document.getElementById(ob_menu + "_sub_foot")) document.getElementById(ob_menu + "_sub_foot").style.visibility = "visible";
            if (document.getElementById(ob_menu + "_sub_left")) document.getElementById(ob_menu + "_sub_left").style.visibility = "visible";
            if (document.getElementById(ob_menu + "_footer")) document.getElementById(ob_menu + "_footer").style.visibility = "visible";
            document.getElementById(ob_menu + "_head").style.visibility = "visible";
            document.getElementById(ob_menu + "_resize").style.visibility = "visible";
            document.getElementById(ob_menu + "_resize_img").style.visibility = "visible";

            // Set up specific properties depending on ob_menu type:
            // resize and move
            if (dd.elements[ob_menu + "_head"] != undefined) dd.elements[ ob_menu + "_head"].moveTo(parseInt(x), parseInt(y));
            document.getElementById(ob_menu).style.width = w;
            document.getElementById(ob_menu).style.height = h;
            if (dd.elements[ob_menu] != undefined)dd.elements[ob_menu].resizeTo(parseInt(w), parseInt(h));

            openbexi_set_draggable(ob_menu + "_resize", true);
            openbexi_set_draggable(ob_menu + "_head", true);

            // resize and move
            this.move(ob_menu, status);
            this.resize(ob_menu, status);

            // Build and display the body of the window ob_menu
            this.build_window_body(ob_menu, status, body_objects, body_objects_draggable);

            // Update the window manager list
            this.window_list_manager(ob_menu, status);
            this.window_manager_up();

            // resize and move
            this.move(ob_menu, status);
            this.resize(ob_menu, status);


        } else if (status == "minimize") {

            document.getElementById(ob_menu + "_window_manager_img").src = "gif/window_manager_full_x32.png";
            document.getElementById(ob_menu).style.visibility = "visible";
            if (document.getElementById(ob_menu + "_sub")) document.getElementById(ob_menu + "_sub").style.visibility = "visible";
            if (document.getElementById(ob_menu + "_sub_foot")) document.getElementById(ob_menu + "_sub_foot").style.visibility = "visible";
            if (document.getElementById(ob_menu + "_sub_left")) document.getElementById(ob_menu + "_sub_left").style.visibility = "visible";
            if (document.getElementById(ob_menu + "_filter")) document.getElementById(ob_menu + "_filter").style.visibility = "visible";
            if (document.getElementById(ob_menu + "_footer")) document.getElementById(ob_menu + "_footer").style.visibility = "visible";
            document.getElementById(ob_menu + "_head").style.visibility = "visible";
            document.getElementById(ob_menu + "_resize").style.visibility = "hidden";
            document.getElementById(ob_menu + "_resize_img").style.visibility = "hidden";

            // Set up specific properties depending on ob_menu type:
            document.getElementById("ob_menu1").style.borderBottom = border;
            document.getElementById("ob_menu_editor").style.borderBottom = border;
            document.getElementById("ob_menu2").style.borderBottom = border;
            document.getElementById("ob_logo").style.borderRadius = ob_radius;
            document.getElementById("ob_logo_img0").style.background = document.getElementById(ob_menu + "_head").style.background;

            //dd.elements[ob_menu + "_head"].moveTo(parseInt(document.getElementById("ob_frame_top").style.width) + 3, parseInt(parseInt(document.getElementById("ob_menu_editor").style.top) + parseInt(document.getElementById("ob_menu_editor").style.height) + 2));
            document.getElementById(ob_menu).style.width = parseInt(divPropertiesWidth) + 219 + "px";
            document.getElementById(ob_menu).style.height = default_ob_menu_height;

            openbexi_set_draggable(ob_menu + "_resize", false);
            openbexi_set_draggable(ob_menu + "_head", false);

            // Update the window manager list
            this.window_list_manager(ob_menu, status);
            this.window_manager_up();

            // resize and move
            this.move(ob_menu, status);
            this.resize(ob_menu, status);

            // Build and display the body of the window ob_menu
            this.build_window_body(ob_menu, status, body_objects, body_objects_draggable);

        } else {
            document.getElementById(ob_menu).style.visibility = "hidden";
            if (document.getElementById(ob_menu + "_sub")) document.getElementById(ob_menu + "_sub").style.visibility = "hidden";
            if (document.getElementById(ob_menu + "_filter")) document.getElementById(ob_menu + "_filter").style.visibility = "hidden";
            if (document.getElementById(ob_menu + "_footer")) {
                document.getElementById(ob_menu + "_footer").style.visibility = "hidden";
                document.getElementById(ob_menu + "_footer").style.left = "-999px";
            }
            document.getElementById(ob_menu + "_head").style.visibility = "hidden";
            document.getElementById(ob_menu + "_resize").style.visibility = "hidden";
            document.getElementById(ob_menu + "_resize_img").style.visibility = "hidden";

            document.getElementById(ob_menu).style.left = "-999px";
            document.getElementById(ob_menu + "_head").style.left = "-999px";
            document.getElementById(ob_menu + "_resize").style.left = "-999px";

            if (ob_menu == "ob_menu_FileBrowser") {
                if (dijit.byId("filesBrowser")) dijit.byId("filesBrowser").destroy();
                if (dijit.byId("tree_filesBrowser")) dijit.byId("tree_filesBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub");
            }
            if (ob_menu == "ob_menu_JavascriptBrowser") {
                if (dijit.byId("javascriptsBrowser"))dijit.byId("javascriptsBrowser").destroy();
                if (dijit.byId("tree_javascriptsBrowser"))dijit.byId("tree_javascriptsBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub");
            }
            if (ob_menu == "ob_menu_CSS") {
                if (dijit.byId("CSSBrowser"))dijit.byId("CSSBrowser").destroy();
                if (dijit.byId("tree_CSSBrowser"))dijit.byId("tree_CSSBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub");
            }
            if (ob_menu == "ob_menu_PictureBrowser") {
                if (dijit.byId("picturesBrowser"))dijit.byId("picturesBrowser").destroy();
                if (dijit.byId("tree_picturesBrowser"))dijit.byId("tree_picturesBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub");
            }
            if (ob_menu == "ob_menu_TemplateBrowser") {
                if (dijit.byId("templatesBrowser"))dijit.byId("templatesBrowser").destroy();
                if (dijit.byId("tree_templatesBrowser"))dijit.byId("tree_templatesBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub");
            }
            if (ob_menu == "ob_menu_RequestBrowser") {
                if (document.getElementById(ob_menu + "_sub_left")) document.getElementById(ob_menu + "_sub_left").style.visibility = "hidden";
                if (document.getElementById(ob_menu + "_sub_foot")) document.getElementById(ob_menu + "_sub_foot").style.visibility = "hidden";
                if (dijit.byId("requestsBrowser"))dijit.byId("requestsBrowser").destroy();
                if (dijit.byId("tree_requestsBrowser"))dijit.byId("tree_requestsBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub_left");
            }
            if (ob_menu == "ob_menu_SQLBrowser") {
                if (dijit.byId("SQLBrowser"))dijit.byId("SQLBrowser").destroy();
                if (dijit.byId("tree_SQLBrowser"))dijit.byId("tree_SQLBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub");
            }
            if (ob_menu == "ob_menu_FTPBrowser") {
                if (dijit.byId("FTPBrowser"))dijit.byId("FTPBrowser").destroy();
                if (dijit.byId("tree_FTPBrowser"))dijit.byId("tree_FTPBrowser").destroyRecursive();
                openbexi_remove_tree(ob_menu + "_sub");
            }
            if (ob_menu == "ob_menu_debugging") {
                document.getElementById("ob_menu_debugging_exception_img").style.visibility = "hidden";
                document.getElementById("ob_menu_debugging_error_img").style.visibility = "hidden";
                document.getElementById("ob_menu_debugging_warning_img").style.visibility = "hidden";
                document.getElementById("ob_menu_debugging_info_img").style.visibility = "hidden";
                document.getElementById("ob_menu_debugging_classe_img").style.visibility = "hidden";
                document.getElementById("ob_menu_debugging_function_img").style.visibility = "hidden";
                document.getElementById("ob_menu_debugging_data_img").style.visibility = "hidden";
                document.getElementById("ob_menu_debugging_event_img").style.visibility = "hidden";
            }

            // Update the window manager list
            this.window_list_manager(ob_menu, status);
            this.window_manager_up();

            // resize and move
            this.move(ob_menu, status);
            this.resize(ob_menu, status);
        }

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.build_and_display_window()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.window_manager_down = function (event, this_div) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.window_manager_down(" + event + "," + this_div + ")", "Info:");

        if (document.getElementById(this_div.id).src.match(RegExp("full")))
            document.getElementById(this_div.id).src = "gif/window_manager_full_down_x32.png";
        else
            document.getElementById(this_div.id).src = "gif/window_manager_down_x32.png";
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.window_manager_down()", "Exception:" + e.message);
    }
}
var obClearTree;
openbexi_navigator.prototype.build_window_body = function (ob_menu, status, objects, dhtml) {

    var new_h_w_RequestBrowser = false;
    var new_h_w_SQLBrowser = false;
    var path_dirs = new Array();
    var count_path_dirs = 0;

    try {
        if (objects == null) return;
        var html = "";
        var top = 44;
        var left = 10;
        for (var i = 0; i < objects.length; i++) {
            var tag = objects[i][0];
            var div_id = objects[i][1];
            if (div_id == '')
                div_id = objects[i][1] = "ob_" + i;
            var currentFcn_onclick = objects[i][2];
            var currentFcn_onmouseup = objects[i][3];
            var currentFcn_onmousedown = objects[i][4];
            var currentFcn_onmouseover = objects[i][5];
            var currentFcn_onmouseout = objects[i][6];
            var title = openbexi_lang(objects[i][7]);
            var image = objects[i][8];
            var w = objects[i][9];
            var h = objects[i][10];
            var css = objects[i][11];
            if (css == undefined)css = "";
            var tabIndex = parseInt(objects[i][12]);
            var input = objects[i][13];
            //if (isNaN(input)) input = "";

            if (tag == "menu_RequestBrowser") {
                if (w != '')_ob_menu_RequestBrowser_w = w;
                if (h != '')_ob_menu_RequestBrowser_h = h;
                document.getElementById("ob_menu_RequestBrowser_text").childNodes[0].innerHTML = title;
                new_h_w_RequestBrowser = true;
            }
            if (tag == "window_left" || tag == "window_body" || tag == "window_foot") {
                document.getElementById(div_id).style["cssText"] = css;
            }

            // Gallery
            if (tag == "gallery") {
                if (ob_menu == "ob_menu_widget")
                    html += "<div class=\"ob_openbexi_global_background ob_menu_properties_box\" id=\"" + div_id + "\" style=top:" + top + "px;left:" + left + "px;width: " + w + "; height: " + h + ";\">";
                else
                    html += "<div class=\"ob_menu_properties_gallery\" id=\"" + div_id + "\" style=top:" + top + "px;left:" + left + "px;width: " + w + "; height: " + h + ";\">";

                html += " <img title= " + title + " src=\"" + image + "\" id=\"" + ob_menu + "_" + "image" + i + "\"";
                if (currentFcn_onclick != "") html += " onclick=\"" + currentFcn_onclick + "\" ";
                if (currentFcn_onmousedown != "")html += " currentFcn_onmousedown=\"" + currentFcn_onmousedown + "\" ";
                if (currentFcn_onmouseup != "")html += " onmouseup=\"" + currentFcn_onmouseup + "\" ";
                if (currentFcn_onmouseover != "")html += " onmouseover=\"" + currentFcn_onmouseover + " ;";
                if (currentFcn_onmouseout != "")html += " onmouseout=\"" + currentFcn_onmouseout + ";";
                html += " style=\"width: " + w + "; height: " + h + ";" + css + "\">";
                html += "</div>";
                html += "<div class=\"ob_menu_widget_text_box\" id=\"" + div_id + "_text" + "\" ><a>" + title + "</a></div>";
            }

            if (tag == "tree") {
                try {
                    this.open_project(div_id, title);
                } catch (e1) {
                    alert(e1.message);
                }
            }
            if (tag == "ftp_tree") {
                try {
                    openbexi_get_sftp_server_info_CB(null, div_id);
                } catch (e1) {
                    alert(e1.message);
                }
            }
            if (tag == "sql_tree") {
                try {
                    openbexiNavigator.open_SQL_DataBase("ob_menu_RequestBrowser_sub_left");
                } catch (e1) {
                    alert(e1.message);
                }
            }
            if (tag == "javascript_tree") {
                try {
                    openbexi_get_javascript_functions(getSelectedBexiObj(null).div.id);
                } catch (e1) {
                    openbexi_get_javascript_functions("BODY");
                }
            }
            if (tag == "javascript_code") {
                try {
                    setTimeout(function () {
                        openbexiNavigator.create_tree("rawdata", openbexi_get_wizard_js_json_tree(), "ob_menu_RequestBrowser_sub_left", null, null, true, undefined);
                    }, 300);
                } catch (e1) {
                    alert(e1.message);
                }
            }
            if (tag == "path") {
                var items = image.split("\\");
                if (items.length == 1) items = image.split("\/");
                if (items.length != 0) {

                    var new_path = "";
                    html += "<div id=\"ob_path_dir_" + i + "\" style=\"border-bottom:1px solid #DDE099;font-size:0.9em;overflow:hidden;background:url(gif/fading_background_12_H.png) no-repeat;position:absolute;top:40px;left:0px;height:20px;width:" + document.getElementById(ob_menu).style.width + ";\" >";
                    for (var p = 0; p < items.length; p++) {
                        if (p == 0 && items[p] == "")
                            new_path = "\/";
                        if (items[p] != ".." && items[p] != "") {
                            if (p < items.length - 1) {
                                new_path += items[p] + "\/";
                                html += '<a onmouseover=openbexi_set_CSS(this,\"background:yellow;cursor:pointer;\") onmouseout=openbexi_set_CSS(this,\"background::url(gif/fading_background_12_H.png);cursor:;\") onclick=openbexiNavigator.browse_picture(\"' + "" + '\",\"dir\",\"' + openbexi_system.openbexi_stringReplaceAll(new_path, " ", "-##-") + '\",\"gallery\",true,false) >' + items[p] + '/</a>';
                            } else {
                                new_path += items[p];
                                html += '<a onmouseover=openbexi_set_CSS(this,\"background:yellow;cursor:pointer;\") onmouseout=openbexi_set_CSS(this,\"background:url(gif/fading_background_12_H.png);cursor:;\") onclick=openbexiNavigator.browse_picture(\"' + "" + '\",\"dir\",\"' + openbexi_system.openbexi_stringReplaceAll(new_path, " ", "-##-") + '\",\"gallery\",true,false) >' + items[p] + '</a>';
                            }
                        }
                    }
                    html += "</div>";
                    path_dirs[count_path_dirs] = "ob_path_dir_" + count_path_dirs;
                    count_path_dirs++;
                }
            }
            if (tag == "form") {
                html += '<form id="' + div_id + '" action="..." method="post" style="left:0;' + css + '">';
            }
            if (tag == "fieldset") {
                html += '<fieldset id="' + div_id + '" style="' + css + ';">';
            }
            if (tag == "legend") {
                html += '<legend>' + title + '</legend>';
            }
            if (tag == "message") {
                html += '<div style="height:64px;" ><div style="position:absolute;height:64px;width:100%;">';
                html += '<div style="height:64px;width:100%;left:0px;top:0px;"><img src=' + image + ' id=' + div_id + '_img></div>';
                html += '<div id=' + div_id + '_div ' + currentFcn_onclick + ' onmouseout=openbexi_set_CSS(this,\"background:url(gif/fading_background_1_H.png);cursor:pointer;overflow:hidden;position:absolute;height:60px;width:340px;left:70px;top:12px;\"); onmouseover=openbexi_set_CSS(this,\"background:url(gif/fading_background_1.png);cursor:pointer;overflow:hidden;position:absolute;height:60px;width:340px;left:70px;top:12px;\");  style="background:gif/fading_background_1_H.png;overflow:hidden;position:absolute;height:60px;width:340px;left:70px;top:12px;"><strong>' + title + '</strong></div>';
                html += '</div></div>';
                html += '<br/>';
            }
            if (tag == "message2") {
                html += '<div style="height:64px;" ><div style="position:absolute;height:64px;width:450px;">';
                html += '<div align=center ' + currentFcn_onclick + ' style="cursor:pointer;position:absolute;height:44px;width:300px;left:0px;top:20px;"><strong>' + title + '</strong></div>';
                html += '<div ' + currentFcn_onclick + ' style="cursor:pointer;position:absolute;height:32px;width:120px;left:300px;top:0px;border:1px solid green"><img style="height:100%;width:100%;cursor:pointer;" ' + currentFcn_onclick + ' src=' + image + ' id=' + div_id + '_img></div>';
                html += '</div></div';
                html += '<br/>';
            }
            if (tag == "input") {
                if (title != "")
                    html += '<label for="' + div_id + '">' + title + ' : </label>';
                html += '<input name="' + div_id + '" id="' + div_id + '" type="text" ' + currentFcn_onclick + ' ' + currentFcn_onmousedown + ' value="' + input + '" style="' + css + '"/>';
                html += '<br/>';
            }
            if (tag == "textarea") {
                if (title != "" && div_id == "bexicontext_CSS_class_data") {
                    html += '<label id="label_' + div_id + '" for="' + div_id + '">' + title + ' : </label><b>    Category name=</b><a id="category_' + div_id + '" for="' + div_id + '">' + getSelectedBexiObj(null).subtheme + '  </a><b>    Class name=</b><a id="class_' + div_id + '" for="' + div_id + '">' + getSelectedBexiObj(null).theme + '  </a>';
                    //html += '<textarea name="hyper_class_' + div_id + '" id="hyper_class_' + div_id + '" type="text" ' + ' value="" style="visibility:visible;" cols=10 rows=1 ></textarea>';
                    //html += '<textarea name="class_' + div_id + '" id="class_' + div_id + '" type="text" ' + ' value="" style="visibility:visible;" cols=10 rows=1 ></textarea>';
                }
                else {
                    html += '<label id="label_' + div_id + '" for="' + div_id + '">' + title + ' : </label>';
                }
                html += '<textarea name="' + div_id + '" id="' + div_id + '" type="text" ' + currentFcn_onmousedown + ' value="" style="visibility:visible;' + css + '" cols=26 rows=' + tabIndex + '></textarea>';
                html += '<br/>';
            }
            if (tag == "input_passwd") {
                if (title != "")
                    html += '<label for="' + div_id + '">' + title + ' : </label>';
                html += '<input ' + currentFcn_onmousedown + ' name="' + div_id + '" id="' + div_id + '" type="password" value="' + input + '" style="background-image: url(\'gif/fading_background_2_red.png\');' + css + '">';
                html += '<br/>';
            }
            if (tag == "input_hidden") {
                html += '<input  name="' + div_id + '" id="' + div_id + '" type="text" value="' + input + '" style="' + "visibility:hidden;width:0px;height:0px;" + '"/>';
            }
            if (tag == "input_id" || tag == "input_jws") {
                if (title != "")
                    html += '<label for="' + div_id + '">' + title + ' : </label>';
                html += '<input ' + currentFcn_onmousedown + ' name="' + div_id + '" id="' + div_id + '" type="text" value="' + input + '" style="' + css + '"/>';
                html += '<img ' + currentFcn_onclick + ' ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + '" id="img_' + div_id + '" src="' + 'gif/combo_22x24.jpg' + '" style="' + 'cursor:pointer;border:1px solid red;height:22px;width:24px;' + '"/>';
                html += '<br/>';
            }
            if (tag == "input_css") {
                if (title != "")
                    html += '<label for="' + div_id + '">' + title + ' : </label>';
                html += '<input ' + currentFcn_onmousedown + ' name="' + div_id + '" id="' + div_id + '" type="text" value="' + input + '" style="' + css + '"/>';
                html += '<img ' + currentFcn_onclick + ' ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + '" id="img_' + div_id + '" src="' + 'gif/ob_css_x48.png' + '" style="' + 'cursor:pointer;height:48px;width:48px;' + '"/>';
                html += '<br/>';
            }
            if (tag == "input_sql") {
                if (title != "")
                    html += '<label for="' + div_id + '">' + title + ' : </label>';
                html += '<input ' + currentFcn_onmousedown + ' name="' + div_id + '" id="' + div_id + '" type="text" value="' + input + '" style="' + css + '"/>';
                html += '<img ' + currentFcn_onclick + ' ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + '" id="img_' + div_id + '" src="' + 'gif/ob_sql_x48.png' + '" style="' + 'cursor:pointer;height:48px;width:48px;' + '"/>';
                html += '<br/>';
            }
            if (tag == "combo") {
                if (title != "")
                    html += '<label id="label_' + div_id + '">' + title + ' : </label>';
                html += '<input ' + currentFcn_onmousedown + ' name="' + div_id + '" id="' + div_id + '_input" type="text" value="' + input + '" style="' + css + '"/>';
                html += '<img ' + currentFcn_onclick + ' ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + '" id="img_' + div_id + '" src="' + 'gif/combo_22x24.jpg' + '" style="' + 'cursor:pointer;border:1px solid red;height:22px;width:24px;' + '"/>';
                html += '<br/>';
            }
            if (tag == "input_website" || tag == "input_database") {
                if (title != "")
                    html += '<label for="' + div_id + '">' + title + ' : </label>';
                html += '<input ' + currentFcn_onmousedown + ' name="' + div_id + '" id="' + div_id + '" type="text" value="' + input + '" style="' + css + '"/>';
                html += '<img ' + currentFcn_onclick + '" id="img_' + div_id + '" src="' + 'gif/ob_close_folder_remove_x32.png' + '" style="' + 'cursor:pointer;height:32px;width:32px;' + '"/></img';
                html += '<br/>';
            }
            if (tag == "sep") {
                html += '<br/>';
            }

            if (tag == "set_button") {
                html += '<div ALIGN=CENTER style="height:64px;">';
            }
            if (tag == "image_button") {
                html += '<img style="" id="ob_image_button" ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + ' ' + currentFcn_onmousedown + ' ' + currentFcn_onclick + ' style="' + css + '" src=' + image + ' ><strong>' + title + '</strong>';
            }
            if (tag == "ok") {
                html += '<img style="" id="ob_ok" ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + ' ' + currentFcn_onmousedown + ' ' + currentFcn_onclick + ' style="' + css + '" src="gif/ob_ok.png" ><strong>' + title + '</strong>';
            }
            if (tag == "save") {
                html += '<div ALIGN=CENTER style="height:64px;"><img style="" id="ob_save" ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + ' ' + currentFcn_onmousedown + ' ' + currentFcn_onclick + ' style="' + css + '" src="gif/ob_save.png" ><strong>' + title + '</strong>';
            }
            if (tag == "delete") {
                html += '<img style="" id="ob_delete" ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + ' ' + currentFcn_onmousedown + ' ' + currentFcn_onclick + ' style="' + css + '" src="gif/ob_trash.png" ><strong>' + title + '</strong>';
            }
            if (tag == "publish_project" || tag == "remove_project") {
                html += '<img style="" id="ob_pub" ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + ' ' + currentFcn_onmousedown + ' ' + currentFcn_onclick + ' style="' + css + '" src="gif/foldernet.png" ><strong>' + title + '</strong>';
            }
            if (tag == "cancel") {
                html += '<img style="" id="ob_cancel" ' + currentFcn_onmouseover + ' ' + currentFcn_onmouseout + ' ' + currentFcn_onmousedown + ' ' + currentFcn_onclick + ' style="' + css + '" src="gif/ob_cancel.png" ><strong>' + title + '</strong>';
            }
            if (tag == "endset_button") {
                html += '</div>';
            }
            if (tag == "checkbox") {
                html += '<div id=div_' + div_id + '><label for="' + div_id + '">' + title + ' : </label>';
                html += '<input value="' + title + '" name="' + div_id + '" id="' + div_id + '" type=checkbox checked onClick=openbexi_checkbox_update(this,"' + title + '"); ><div>';
                //html += '<br/>';
            }
            if (tag == "end_fieldset") {
                html += '</fieldset>';
            }
            if (tag == "end_form") {
                html += '</form>';
            }
            if (tag == "end_window_body") {
                if (objects.length > 0 && document.getElementById(ob_menu + "_sub"))document.getElementById(ob_menu + "_sub").innerHTML = html;
                html = '';
            }
            if (tag == "end_window_left") {
            }
            if (tag == "end_window_foot") {
                if (objects.length > 0 && document.getElementById(ob_menu + "_sub_foot"))document.getElementById(ob_menu + "_sub_foot").innerHTML = html;
            }
        }
        if (ob_menu != "ob_menu_RequestBrowser") {
            if (objects.length > 0 && document.getElementById(ob_menu + "_sub"))document.getElementById(ob_menu + "_sub").innerHTML = html;
        }

        // ADD DHTML drag&drop features
        if (dhtml) {
            for (var j = 0; j < objects.length; j++) {
                div_id = objects[j][1];
                try {
                    dd.elements[div_id].del();
                } catch (e) {
                }
            }
            for (var j = 0; j < objects.length; j++) {
                div_id = objects[j][1];
                try {
                    if (div_id == "image" || div_id == "video")
                        ADD_DHTML(div_id);
                    else
                        ADD_DHTML(div_id + CURSOR_MOVE);
                } catch (e) {
                }
            }
            // Update top and left for each widget
            this.update_window_body_items(ob_menu, objects, true, path_dirs);
        } else {
            this.update_window_body_items(ob_menu, objects, false, path_dirs);
        }
        this.resize_RequestBrowser_body();
        this.populateData_to_RequestBrowser(objects);

        // If width/height updated:)

        if (new_h_w_RequestBrowser) {
            document.getElementById(ob_menu + "_head").style.width = _ob_menu_RequestBrowser_w;
            document.getElementById(ob_menu).style.width = _ob_menu_RequestBrowser_w;
            document.getElementById(ob_menu).style.height = _ob_menu_RequestBrowser_h;

            document.getElementById(ob_menu).style.width = _ob_menu_RequestBrowser_w;
            document.getElementById(ob_menu).style.height = _ob_menu_RequestBrowser_h;
            if (dd.elements[ob_menu] != undefined) dd.elements[ob_menu].resizeTo(parseInt(_ob_menu_RequestBrowser_w), parseInt(_ob_menu_RequestBrowser_h));

            // resize and move
            this.move(ob_menu, "maximize");
            this.resize(ob_menu, "maximize");
        }
        // setTimeout(function () {
        //ob_menu_requestBrowser.ob_state.title = '<label><b> Try : </b></label>';
        //ob_menu_requestBrowser.ob_state.html = '<div style="position:relative;height:464px;width:750px;">' + document.getElementById(ob_menu).innerHTML + '</div>';
        //ob_menu_requestBrowser.ob_state.buttons=' { Ok: true, Cancel: false }';
        //openbexiNavigator.prompt(null, ob_menu_requestBrowser);
        // }, 100);

        //__openbexi_debugC("openbexi_navigator.prototype.build_window_body()", "Html:" + document.getElementById(_ob_menuId_focus).innerHTML);
    }
    catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.build_window_body()", "Exception:" + e.message);
    }
}

var ob_menu_requestBrowser = {
    ob_state: {
        buttons: { Ok: true, Cancel: false },
        focus: "input[name='ob_menu_requestBrowser']",
        position: { container: '#ob_menu_editor', x: -50, y: 80, width: 850, arrow: 'bl' },
        submit: function (e, v, m, f) {
            try {
                openbexi_stopEventPropagation(e);
                openbexiNavigator.prompt_working = false;
                if (v) {
                }
                openbexiNavigator.prompt_close(e);
            } catch (ex) {
                __openbexi_debugC("openbexi_navigator.prompt(ob_preview)", "Exception:" + e.message);
            }
        }
    }
};
function openbexi_checkbox_update(checkbox, title, status) {
    var html = '<label for="' + checkbox.id + '">' + title + ' : </label>';
    html += '<input value="' + title + '" name="' + checkbox.id + '" id="' + checkbox.id + '" type=checkbox onclick=openbexi_checkbox_update(this,"' + title + '"); >';
    if (checkbox.checked && status != "false") {
        html = '<label for="' + checkbox.id + '">' + title + ' : </label>';
        html += '<input value="' + title + '" name="' + checkbox.id + '" id="' + checkbox.id + '" type=checkbox checked onclick=openbexi_checkbox_update(this,"' + title + '"); >';
    }
    document.getElementById("div_" + checkbox.id).innerHTML = html;
}

openbexi_navigator.prototype.update_window_body_items = function (ob_menu, objects, resync, path_dirs) {
    try {
        //__openbexi_debugC("openbexi_navigator.prototype.update_window_body_items(" + ob_menu + ", [objects] ," + resync + ")", "Info:");
        var h = 0;
        this.set_menu_focus(ob_menu);

        if (path_dirs != undefined && path_dirs != null) {
            for (var p = 0; p < path_dirs.length; p++) {
                document.getElementById(path_dirs[p]).style.top = h + "px";
                h = h + 25;
            }
        }
        if (document.getElementById(ob_menu + "_head")) h = parseInt(document.getElementById(ob_menu + "_head").style.height);
        if (document.getElementById(ob_menu + "_filter")) h += parseInt(document.getElementById(ob_menu + "_filter").style.height);
        var top = h;
        var left = 10;
        var div_id;
        var top_text;
        var count_visible = 0;
        var bottom = parseInt(document.getElementById(ob_menu).style.height);
        var doc;
        var current = 0;
        var begin = 0;
        var end = 0;
        if (ob_menu == "ob_menu_widget" || ob_menu == "ob_menu_PictureBrowser" || ob_menu == "ob_menu_SQLBrowser" || ob_menu == "ob_menu_FTPBrowser") {
            if (ob_menu == "ob_menu_widget" && this.ob_menu_widget_pager != null) {
                current = parseInt(this.ob_menu_widget_pager.posCurrentItem);
                begin = 0;
                end = objects.length;
                top = h + 30;
            }
            if (ob_menu == "ob_menu_PictureBrowser" && this.ob_menu_PictureBrowser_pager != null) {
                current = 1;
                begin = 1;
                end = objects.length;
                top = h + 30;
            }

            if (ob_menu == "ob_menu_SQLBrowser" && this.ob_menu_SQLBrowser_pager != null) {
                current = parseInt(this.ob_menu_SQLBrowser_pager.posCurrentItem);
                begin = 0;
                end = objects.length;
            }
            for (var j = begin; j < end; j++) {
                div_id = objects[j][1];
                document.getElementById(div_id).style.visibility = "hidden";
                document.getElementById(div_id + "_text").style.visibility = "hidden";
            }
            flag_current = false;
            for (var i = current; i < end; i++) {
                div_id = objects[i][1];
                var flag = true;
                if (flag) {
                    if (i != current) left += parseInt(document.getElementById(div_id).style.width) + 40;
                    if (left + 80 > parseInt(document.getElementById(ob_menu).style.width)) {
                        left = 10;
                        top += parseInt(document.getElementById(div_id).style.height) + 25;
                    }
                    if (resync) {
                        if (dd.elements[div_id] != undefined) {
                            dd.elements[div_id].moveTo(parseInt(document.getElementById(ob_menu).style.left) + left, parseInt(document.getElementById(ob_menu).style.top) + top);
                            //dd.elements[div_id].setDraggable(true);
                        }
                    }
                    else {
                        document.getElementById(div_id).style.top = top + "px";
                        document.getElementById(div_id).style.left = left + "px";
                    }
                    top_text = parseInt(document.getElementById(div_id).style.top) + parseInt(document.getElementById(div_id).style.height) + 1;
                    document.getElementById(div_id + "_text").style.top = top_text + "px";
                    document.getElementById(div_id + "_text").style.left = document.getElementById(div_id).style.left;
                    document.getElementById(div_id + "_text").style.width = parseInt(document.getElementById(div_id).style.width) + 30 + "px";
                    if (top_text + 41 >= bottom) {
                        document.getElementById(div_id).style.visibility = "hidden";
                        document.getElementById(div_id + "_text").style.visibility = "hidden";
                    } else {
                        document.getElementById(div_id).style.visibility = "visible";
                        document.getElementById(div_id + "_text").style.visibility = "visible";
                        count_visible++;
                    }
                }
            }
            if (ob_menu == "ob_menu_widget" && this.ob_menu_widget_pager != null) {
                if (count_visible < end) {
                    if (this.ob_menu_widget_pager.maxItems > objects.length - current)  count_visible = this.ob_menu_widget_pager.maxItems;
                    doc = this.ob_menu_widget_pager.update();
                    set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectMaxCount", objects.length);
                    set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount", count_visible);
                    set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", count_visible);
                    this.ob_menu_widget_pager.display();
                    this.ob_menu_widget_pager.setup(doc);
                } else {
                    this.ob_menu_widget_pager.hide();
                    document.getElementById("ob_menu_widget").style.visibility = "visible";
                }
            }
            var count;
            if (ob_menu == "ob_menu_PictureBrowser" && this.ob_menu_PictureBrowser_pager != null) {
                if (this.ob_menu_PictureBrowser_pager.maxItems > this.ob_menu_PictureBrowser_pager.objectMaxCount - current)  count_visible = this.ob_menu_PictureBrowser_pager.maxItems;
                count = 0;
                doc = this.ob_menu_PictureBrowser_pager.update();
                set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectMaxCount", this.ob_menu_PictureBrowser_pager.objectMaxCount);
                set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount", count_visible);
                set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", count_visible);
                this.ob_menu_PictureBrowser_pager.display();
                this.ob_menu_PictureBrowser_pager.setup(doc);
            }
            if (ob_menu == "ob_menu_SQLBrowser" && this.ob_menu_SQLBrowser_pager != null) {
                if (count_visible < end) {
                    if (this.ob_menu_SQLBrowser_pager.maxItems > objects.length - current)  count_visible = this.ob_menu_SQLBrowser_pager.maxItems;
                    doc = this.ob_menu_SQLBrowser_pager.update();
                    set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectMaxCount", objects.length);
                    set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount", count_visible);
                    set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", count_visible);
                    this.ob_menu_SQLBrowser_pager.display();
                    this.ob_menu_SQLBrowser_pager.setup(doc);
                } else {
                    this.ob_menu_SQLBrowser_pager.hide();
                    document.getElementById("ob_menu_SQLBrowser").style.visibility = "visible";
                }
            }
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.update_window_body_items()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.create_tree = function (rawdata_type, rawdata, ob_menu, type, collapse_all, expand_node_id, expand_child_node_id) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.create_tree([rawdata]," + ob_menu + "," + type + "," + collapse_all + "," + expand_node_id + "," + expand_child_node_id + ")", "info:");
        var modelId;
        var treeId;
        var getIconClass = ob_getCustomIconClass;

        if (ob_menu != null) {
            document.getElementById(ob_menu).style.visibility = "visible";
            document.getElementById(ob_menu).innerHTML = "";
        }
        if (ob_menu == "ob_menu_FileBrowser_sub") {
            if (dijit.byId("filesBrowser"))dijit.byId("filesBrowser").destroy();
            if (dijit.byId("tree_filesBrowser"))dijit.byId("tree_filesBrowser").destroyRecursive();
            modelId = "filesBrowser";
            treeId = "tree_filesBrowser";
            getIconClass = ob_getIconClass;
        }
        if (ob_menu == "ob_menu_JavascriptBrowser") {
            if (dijit.byId("JS_function_Browser"))dijit.byId("JS_function_Browser").destroy();
            if (dijit.byId("tree_JS_function_Browser"))dijit.byId("tree_JS_function_Browser").destroyRecursive();
            modelId = "JS_function_Browser";
            treeId = "tree_JS_function_Browser";
        }
        if (ob_menu == "ob_menu_CSS_sub") {
            if (dijit.byId("CSSBrowser"))dijit.byId("CSSBrowser").destroy();
            if (dijit.byId("tree_CSSBrowser"))dijit.byId("tree_CSSBrowser").destroyRecursive();
            modelId = "CSSBrowser";
            treeId = "tree_CSSBrowser";
            getIconClass = ob_getCSSIconClass;
        }
        if (ob_menu == "ob_menu_PictureBrowser_sub") {
            if (dijit.byId("picturesBrowser"))dijit.byId("picturesBrowser").destroy();
            if (dijit.byId("tree_picturesBrowser"))dijit.byId("tree_picturesBrowser").destroyRecursive();
            modelId = "picturesBrowser";
            treeId = "tree_picturesBrowser";
        }
        if (ob_menu == "ob_menu_TemplateBrowser_sub") {
            if (dijit.byId("templatesBrowser"))dijit.byId("templatesBrowser").destroy();
            if (dijit.byId("tree_templatesBrowser"))dijit.byId("tree_templatesBrowser").destroyRecursive();
            modelId = "templatesBrowser";
            treeId = "tree_templatesBrowser";
        }
        if (ob_menu == "ob_menu_SQLBrowser_sub" && type == "SQLBrowser_tree") {
            if (dijit.byId("SQLBrowser"))dijit.byId("SQLBrowser").destroy();
            if (dijit.byId("tree_SQLBrowser"))dijit.byId("tree_SQLBrowser").destroyRecursive();
            modelId = "SQLBrowser";
            treeId = "tree_SQLBrowser";
            getIconClass = ob_getSQLIconClass;
        }
        if (ob_menu == "ob_menu_RequestBrowser_sub_left" && type == "Javascript_tree") {
            if (dijit.byId("javascriptsBrowser"))dijit.byId("javascriptsBrowser").destroy();
            if (dijit.byId("tree_javascriptsBrowser"))dijit.byId("tree_javascriptsBrowser").destroyRecursive();
            modelId = "javascriptsBrowser";
            treeId = "tree_javascriptsBrowser";
            getIconClass = ob_getJSIconClass;
        }
        if (ob_menu == "ob_menu_RequestBrowser_sub_left" && type == "FTPBrowser_tree") {
            if (dijit.byId("FTPBrowser"))dijit.byId("FTPBrowser").destroy();
            if (dijit.byId("tree_FTPBrowser"))dijit.byId("tree_FTPBrowser").destroyRecursive();
            modelId = "FTPBrowser";
            treeId = "tree_FTPBrowser";
            getIconClass = ob_getFTPIconClass;
        }
        if (ob_menu == "ob_menu_RequestBrowser_sub_left") {
            if (dijit.byId("requestsBrowser"))dijit.byId("requestsBrowser").destroy();
            if (dijit.byId("tree_requestsBrowser"))dijit.byId("tree_requestsBrowser").destroyRecursive();
            modelId = "requestsBrowser";
            treeId = "tree_requestsBrowser";
        }
        var ob_newStore;
        if (rawdata_type == "url") {
            ob_newStore = new dojo.data.ItemFileReadStore({ url: rawdata});
        } else {
            ob_newStore = new dojo.data.ItemFileReadStore({
                data: {
                    identifier: 'id',
                    label: 'label',
                    status: 'status',
                    items: rawdata
                }
            });
        }
        var treeModel = new dijit.tree.ForestStoreModel({
            id: modelId,
            store: ob_newStore
        });
        var treeControl = new dijit.Tree({
            id: treeId,
            model: treeModel,
            showRoot: false,
            openOnClick: true,
            getIconClass: eval(getIconClass),
            _createTreeNode: function (args) {
                var tnode = new dijit._TreeNode(args);
                tnode.labelNode.innerHTML = args.label;
                if (collapse_all != undefined) {
                    try {
                        if (!collapse_all) this._expandNode(tnode);
                    } catch (e) {
                        __openbexi_debugC("openbexi_navigator.prototype.create_tree()", "Exception:" + e.message);
                    }
                    try {
                        if (collapse_all) {
                            this._collapseNode(tnode);
                        }
                    } catch (e) {
                        __openbexi_debugC("openbexi_navigator.prototype.create_tree()", "Exception:" + e.message);
                    }
                }
                try {
                    if (expand_node_id != undefined)
                        if (args.item.id == expand_node_id)
                            this._expandNode(tnode);
                        else
                            this._collapseNode(tnode);
                    if (expand_child_node_id != undefined)
                        if (args.item.id == expand_child_node_id)
                            this._expandNode(tnode);
                } catch (e) {
                    __openbexi_debugC("openbexi_navigator.prototype.create_tree()", "Exception:" + e.message);
                }
                return tnode;
            }
        });

        /*if (ob_menu != null) {
         //dojo.byId(ob_menu).appendChild(treeControl.domNode);
         setTimeout(function () {
         if (treeControl.domNode != null)
         document.getElementById(ob_menu).appendChild(treeControl.domNode);
         }, 100);
         } */
        // Connect to tree onLoad to do work once it has initialized
        if (ob_menu != null) {
            treeControl.onLoadDeferred.then(function () {
                __openbexi_debugC("openbexi_navigator.prototype.create_tree()", "Info: Tree loaded.");
                document.getElementById(ob_menu).innerHTML = "";
                document.getElementById(ob_menu).appendChild(treeControl.domNode);
            })
        }

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.create_tree()", "Exception:" + e.message);
    }
    return treeControl;
}
openbexi_navigator.prototype.setDataServer = function (ob_doc, subtype, path, nextPreviousStatus, posCurrentItem, typeDir, filename, sshCmd, divName, ob_maxItems) {
    try {
        __openbexi_debugC("openbexi_navigator.prototype.setDataServer(" + ob_doc + "," + subtype + "," + path + " ...)", "Info:");
    } catch (e) {
    }
    try {
        var doc = null;
        var privateDoc;
        var connectionCount = 0;
        if (subtype != "" && subtype != undefined && subtype != "openArchiveHTMLPages" && subtype != "openArchiveTemplateHTMLPages" && subtype != "overwrite_HTMLTemplateFromArchive" && subtype != "overwrite_HTMLPageFromArchive" && subtype != "overwrite_HTMLPageFromTemplate")
            this.set_HTML_pageName(filename);

        if (subtype == "openHTMLPages" || subtype == "openTemplateHTMLPages") {
            if (this.mode == "projects") {
                if (openbexi_navigator) openbexi_updateWebPrivateData(null, "bexicontext", "mode", "name", this.mode);
                openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", this.projectName);
                openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);
            }
            if (this.mode == "templates") {
                if (openbexi_navigator) openbexi_updateWebPrivateData(null, "bexicontext", "mode", "name", this.mode);
                openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", this.templateCategory);
                openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", this.HTML_pageName);
            }
        }
        doc = set_xml_classe_object_attribut_value(doc, "system", "command", "text", sshCmd);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", subtype);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", divName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", nextPreviousStatus);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", nextPreviousStatus);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", posCurrentItem);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", typeDir);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", filename);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "path", path);
        if (path == "") doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", filename);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", ob_maxItems);
        var objectMaxCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectMaxCount", objectMaxCount);
        var objectCount = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount", objectCount);
        var filter = "";
        if (this.textFilter) filter = this.textFilter.value;
        var buttonTextFilter = "";
        if (this.buttonTextFilter) buttonTextFilter = this.buttonTextFilter.value;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", buttonTextFilter);
        if (subtype == "sftp") {
            var number = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection", "number");
            var website = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "website");
            var host = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "host");
            var user = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "user");
            var passwd = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "passwd");
            var PublicKey = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "PublicKey");
            var SocketTimeout = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection_" + number, "SocketTimeout");
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection", "number", number);
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + number, "website", website.ob_trim());
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + number, "host", host.ob_trim());
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + number, "user", user.ob_trim());
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + number, "passwd", passwd.ob_trim());
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + number, "PublicKey", PublicKey.ob_trim());
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + number, "SocketTimeout", SocketTimeout.ob_trim());
            doc = set_xml_classe_object_attribut_value(doc, "ob_ssh", "connection_" + number, "path", path.ob_trim());
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", filename);
        }
        if (subtype == "sftpinit") {
            privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
            connectionCount = get_xml_classe_object_attribut_value(privateDoc, "ob_ssh", "connection", "count");
            if (connectionCount < ob_maxItems)return;

        }
        if (subtype == "database") {
            privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
            connectionCount = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "connection", "count");
            if (connectionCount < ob_maxItems)return;

        }
        // Project-webpages
        if (subtype == "openHTMLPages") {
            //if (document.getElementById("ob_project")) document.getElementById("ob_project").innerHTML = "Project:";
            //if (document.getElementById("ob_page")) document.getElementById("ob_page").innerHTML = "Page:";
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_openHTMLPagesRequest");
        }
        if (subtype == "webPages") {
            this.waiting_for_template = false;
            this.waiting_for_archive = false;
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "");
        }
        if (subtype == "webPageTemplates" || subtype == "webTemplates") {
            this.waiting_for_archive = false;
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
        }
        if (subtype == "webProjects") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
        }
        if (subtype == "webTemplateCategory") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
        }
        if (subtype == "javascripts") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "js");
        }
        if (subtype == "create_webTemplateCategory") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_createTemplateCategoryRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
        }
        if (subtype == "create_webProjects") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_createProjectRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
        }
        if (subtype == "create_webPages") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_createPageRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
            filename = filename.replace("\.html", "");
            filename = filename + "\.html";
            doc = set_xml_classe_object_attribut_value(doc, "file", "html", "name", filename);
        }
        if (subtype == "create_webPageTemplates") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_createPageTemplateRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
            filename = filename.replace("\.html", "");
            filename = filename + "\.html";
            doc = set_xml_classe_object_attribut_value(doc, "file", "html", "name", filename);
        }
        if (subtype == "delete_webProjects") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_deleteProjectRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
        }

        if (subtype == "delete_webTemplateCategory") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_deleteTemplateCategoryRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
        }
        if (subtype == "delete_webPageTemplates") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_deleteTemplateRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_project");
            doc = set_xml_classe_object_attribut_value(doc, "file", "html", "name", filename);
        }
        if (subtype == "delete_webPages") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_deleteFileRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "project");
            doc = set_xml_classe_object_attribut_value(doc, "file", "html", "name", filename);
        }
        // Archives
        if (subtype == "archives" || subtype == "archiveTemplates") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "archives");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        }
        if (subtype == "openArchiveHTMLPages") {
            this.waiting_for_archive = true;
            this.waiting_for_template = false;
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_openArchiveHTMLPagesRequest");
        }
        if (subtype == "openArchiveTemplateHTMLPages") {
            this.waiting_for_template = false;
            this.waiting_for_archive = true;
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_openArchiveTemplateHTMLPagesRequest");
        }
        if (subtype == "openTemplateHTMLPages") {
            //if (document.getElementById("ob_project")) document.getElementById("ob_project").innerHTML = "Category:";
            //if (document.getElementById("ob_page")) document.getElementById("ob_page").innerHTML = "Template:";
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_openTemplateHTMLPagesRequest");
        }
        if (subtype == "overwrite_HTMLTemplateFromArchive") {
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_overwrite_HTMLTemplateFromArchiveRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "archive_filename", this.fromArchive);
        }
        if (subtype == "overwrite_HTMLPageFromArchive") {
            this.waiting_for_archive = false;
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_overwrite_HTMLPageFromArchiveRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "archive_filename", this.fromArchive);
        }
        if (subtype == "overwrite_HTMLPageFromTemplate") {
            this.waiting_for_template = false;
            doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_overwrite_HTMLPageFromTemplateRequest");
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "template_filename", this.fromTemplate);
            doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", filename);
        }
        return doc;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.setDataServer()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getCommonData = function (event) {
    try {
        if (event != null)openbexi_stopEventPropagation(event);
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ExplorerRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "images");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        var filter = "";
        if (this.textFilter) filter = this.textFilter.value;
        var buttonTextFilter = "";
        if (this.buttonTextFilter) buttonTextFilter = this.buttonTextFilter.value;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", buttonTextFilter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        return doc;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getCommonData()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getdataFromServer = function (subtype, doc) {
    // send data to server
    try {
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "project", this.projectName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "templateCategory", this.templateCategory);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", subtype);
        var ob_xml = openbexi_get_xmlString(doc);
        if (document.getElementById("SaveFrame"))document.getElementById("SaveFrame").setAttribute("ob_connection", "true");
        var mode_sync = openbexi_synchron();
        var error = openbexi_connect_to_server(null, mode_sync, ob_xml, openbexi_navigator_CB, "ob_menu_PictureBrowser_head");
        if (error && document.getElementById("SaveFrame")) document.getElementById("SaveFrame").setAttribute("ob_connection", "false");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getdataFromServer()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.saveDatabase = function (event, field) {
    try {

        var database3 = "";
        var url3 = "";
        var user3 = "";
        var passwd3 = "";
        var driver3 = "";
        var connection_number = 0;
        var keyCode = "";

        if (event && field != null)
            keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

        if (document.getElementById("bexicontext_connection")) connection_number = openbexi_clearText(document.getElementById("bexicontext_connection").value);
        if (document.getElementById("bexicontext_database")) {
            database3 = openbexi_clearText(document.getElementById("bexicontext_database").value);
            if (field == "bexicontext_database") database3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_url")) {
            url3 = document.getElementById("bexicontext_url").value;
            if (field == "bexicontext_url") url3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_username")) {
            user3 = openbexi_clearText(document.getElementById("bexicontext_username").value);
            if (field == "bexicontext_username") user3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_passwd")) {
            passwd3 = document.getElementById("bexicontext_passwd").value;
            if (field == "bexicontext_passwd") passwd3 += String.fromCharCode(keyCode);
        }
        if (document.getElementById("bexicontext_driver")) {
            driver3 = document.getElementById("bexicontext_driver").value;
            if (field == "bexicontext_driver") driver3 += String.fromCharCode(keyCode);
        }

        var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "connection", "number", connection_number);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "myName", database3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "url", url3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "user", user3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "passwd", passwd3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "driver", driver3);
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(privateDoc));
        if (field != "bexicontext_passwd") openbexi_saveXMLFile("private_bexicontext.xml", OPENBEXI_PRIVATE_CONTEXT_XML);

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.saveDatabase()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.getTimelineEvents = function (event, mode) {
    try {
        openbexi_stopEventPropagation(event);
        var doc = this.getCommonData(event);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "timelineEvents");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "data/xml");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "timeline", "mode", getSelectedBexiObj(null).mode);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "mode", mode);
        var filter = this.HTML_pageName.replace(".xml", "");
        if (this.textFilter) this.textFilter.value = filter;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        this.getdataFromServer("timelineEvents", doc);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getTimelineEvents()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getChartXML = function (event, mode) {
    try {
        openbexi_stopEventPropagation(event);
        var doc = this.getCommonData(event);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "chartXML");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "data/xml");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "timeline", "mode", getSelectedBexiObj(null).mode);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "mode", mode);
        var filter = this.HTML_pageName.replace(".xml", "");
        if (this.textFilter) this.textFilter.value = filter;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        this.getdataFromServer("chartXML", doc);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getChartXML()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getRSS = function (event, mode) {
    try {
        openbexi_stopEventPropagation(event);
        var doc = this.getCommonData(event);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "RSS");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "data/rss");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "timeline", "mode", getSelectedBexiObj(null).mode);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "mode", mode);
        var filter = this.HTML_pageName.replace(".xml", "");
        if (this.textFilter) this.textFilter.value = filter;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        this.getdataFromServer("RSS", doc);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getRSS()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getTimelineBands = function (event, mode) {
    try {
        openbexi_stopEventPropagation(event);
        var doc = this.getCommonData(event);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "timelineBands");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/bands");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "timeline", "mode", getSelectedBexiObj(null).mode);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "mode", mode);
        var filter = this.HTML_pageName.replace(".js", "");
        if (this.textFilter) this.textFilter.value = filter;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        this.getdataFromServer("timelineBands", doc);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getTimelineBands()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getTimelineThemes = function (event, mode) {
    try {
        openbexi_stopEventPropagation(event);
        var doc = this.getCommonData(event);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "timelineThemes");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "dirname", "template/ob_timeline/themes");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "timeline", "mode", getSelectedBexiObj(null).mode);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filename", "");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "mode", mode);
        var filter = this.HTML_pageName.replace(".js", "");
        if (this.textFilter) this.textFilter.value = filter;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", "");
        this.getdataFromServer("timelineThemes", doc);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getTimelineThemes()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getDatabaseObject = function (connection_number) {
    try {
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "type", "openbexi_ModelsRequest");
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "database_table");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");

        var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var myName3 = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "myName");
        var url3 = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "url");
        var user3 = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "user");
        var passwd3 = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "passwd");
        var driver3 = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connection_number, "driver");

        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "connection", "number", connection_number);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "myName", myName3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "url", url3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "user", user3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "passwd", passwd3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + connection_number, "driver", driver3);

        // Set as default database
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "myName", myName3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "url", url3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "user", user3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "passwd", passwd3);
        doc = set_xml_classe_object_attribut_value(doc, "ob_database", "databaseCurrent", "driver", driver3);
        var filter = "";
        if (this.textFilter) filter = this.textFilter.value;
        var buttonTextFilter = "";
        if (this.buttonTextFilter) buttonTextFilter = this.buttonTextFilter.value;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "filter", filter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "filter", buttonTextFilter);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");

        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "myName", myName3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "url", url3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "user", user3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "passwd", passwd3);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "databaseCurrent", "driver", driver3);
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(privateDoc));
        return doc;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getDatabaseObject()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getDatabaseObjects = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        var myName = "";
        var hostname = "";
        var user = "";
        var passwd = "";
        var driver = "";
        var connected = "false";

        var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var connectionCount = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "connection", "count");
        if (connectionCount == null || connectionCount == "") {
            connectionCount = 0;
            ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_database", "connection", "count", 0);
        }
        var doc = null;
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectCount", connectionCount);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file", "objectMaxCount", parseInt(connectionCount));
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dirUp", "path", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "status", "text", "done");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "gui", "divName", this.divName);
        doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "database");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "dir", "type", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "maxItems", this.maxItems);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "posCurrentItem", 0);
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "list", "nextPreviousStatus", "none");
        doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "pager", "number", "0");
        for (var j = 0; j < parseInt(connectionCount); j++) {
            try {
                myName = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + j, "myName");
                hostname = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + j, "url");
                user = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + j, "user");
                passwd = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + j, "passwd");
                driver = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + j, "driver");
                connected = get_xml_classe_object_attribut_value(ob_doc, "ob_database", "database_" + j, "connected");

                doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + j, "myName", myName.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + j, "url", hostname.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + j, "user", user.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + j, "passwd", passwd.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_database", "database_" + j, "driver", driver.ob_trim());
                connected = set_xml_classe_object_attribut_value(doc, "ob_database", "connection_" + j, "path", connected.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file_" + j, "filename", hostname.ob_trim());
                doc = set_xml_classe_object_attribut_value(doc, "ob_explorer", "file_" + j, "type", "dir");
            } catch (e) {
                __openbexi_debugC("openbexi_navigator.prototype.getDatabaseObjects()", "Exception:" + e.message);
            }
        }
        openbexi_get_xmlString(doc);
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(ob_doc));
        return doc;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getDatabaseObjects()", "Exception:" + e.message);
        return doc;
    }
}
openbexi_navigator.prototype.getLocalData = function (event) {
    if (event != null && event != undefined)openbexi_stopEventPropagation(event);
    var doc = this.getCommonData(event);
    doc = set_xml_classe_object_attribut_value(doc, "ob_request", "request", "subtype", "local");
    this.getdataFromServer("local", doc);
}
openbexi_navigator.prototype.reset = function (full) {
    try {
        if (full) {
            try {
                var genericObject = new openbexi_generic_object(null);
                genericObject.removeObjects();
                document.body.bgColor = "#ffffff";
            } catch (e) {
                __openbexi_debugC("openbexi_navigator.prototype.reset()", "Exception:" + e.message);
            }
            this.templateCategory = "no_name";
            this.waiting_for_template = false;
            this.waiting_for_archive = false;
            this.projectName = "no_name";
            this.set_HTML_pageName(null);
        } else {
            if (this.set_working_status != undefined)
                this.set_working_status(false);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.reset()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.getDefaultUrl = function () {
    return this.hrefPath + "openbexi.do";
}
openbexi_navigator.prototype.removeDatabase = function (connection_number) {
    try {
        if (connection_number == null) {
            //Look for connection according hidden input field
            if (document.getElementById("bexicontext_connection"))    connection_number = document.getElementById("bexicontext_connection").value;
            if (connection_number == "") {
                __openbexi_debugC("openbexi_navigator.prototype.removeDatabase()", "Error:Cannot remove this database connection ...");
                return;
            }
        }
        var doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        doc = delete_xml_classe_object(doc, "ob_database", "database_" + connection_number);
        var connectionCount = get_xml_classe_object_attribut_value(doc, "ob_database", "connection", "count");
        set_xml_classe_object_attribut_value(doc, "ob_database", "connection", "count", parseInt(connectionCount) - 1);
        set_xml_classe_object_attribut_value(doc, "ob_database", "connection", "number", parseInt(connectionCount) - 2);
        // Reorganize the datatbase
        var objList = get_xml_classe_objects(doc, "ob_database");
        var count = 0;
        for (var i = 0; i < objList.length; i++) {
            if (objList[i].getAttribute("name").match("database_")) {
                objList[i].setAttribute("name", "database_" + count);
                count++;
            }
        }
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(doc));
        openbexi_savePrivateData(null);
        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_SQL_database, 'maximize');
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.removeDatabase()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.removeProject = function (event) {
    openbexi_stopEventPropagation(event);
    this.window_factory(event, 'ob_menu_RequestBrowser', ob_delete_projects, 'hidden');
    var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");
    if (navigator_mode == "ob_template") {
        var doc = this.setDataServer(null, "delete_webTemplateCategory", this.path, "none", 0, "dir", this.projectName, "", "", this.divName, this.maxItems);
        this.getdataFromServer("delete_webTemplateCategory", doc);
    } else {
        var doc = this.setDataServer(null, "delete_webProjects", this.path, "none", 0, "dir", this.projectName, "", "", this.divName, this.maxItems);
        this.getdataFromServer("delete_webProjects", doc);
    }
}
openbexi_navigator.prototype.removeWebPages = function (event) {
    openbexi_stopEventPropagation(event);
    var list_removed_pages = "";
    var page = "";

    try {
        var count_project = 0;
        var count_project_web_page = 0;
        var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");
        while (this.RequestBrowser_json_tree[count_project] != undefined) count_project++;
        for (var i = 0; i < count_project; i++) {
            count_project_web_page = 0;
            while (this.RequestBrowser_json_tree[i].children[count_project_web_page] != undefined) count_project_web_page++;
            for (var j = 0; j < count_project_web_page; j++) {
                if (this.RequestBrowser_json_tree[i].children[j].status == "removed")
                    list_removed_pages += this.RequestBrowser_json_tree[i].children[j].project_web_page_name + "(project:" + this.RequestBrowser_json_tree[i].project + ") \n";
            }
        }
        if (list_removed_pages == "") {
            alert("No page has been selected");
            return;
        }
        for (i = 0; i < count_project; i++) {
            count_project_web_page = 0;
            while (this.RequestBrowser_json_tree[i].children[count_project_web_page] != undefined) count_project_web_page++;
            for (j = 0; j < count_project_web_page; j++) {
                if (this.RequestBrowser_json_tree[i].children[j].status == "removed") {
                    this.projectName = this.RequestBrowser_json_tree[i].project;
                    page = this.RequestBrowser_json_tree[i].children[j].project_web_page_name.toString().replace(" ", "");
                    if (navigator_mode == "ob_template") {
                        var doc1 = this.setDataServer(null, "delete_webPageTemplates", this.path, "none", 0, "dir", page, "", this.divName, this.maxItems);
                        this.getdataFromServer("delete_webPageTemplates", doc1);
                    } else {
                        var doc1 = this.setDataServer(null, "delete_webPages", this.path, "none", 0, "dir", page, "", this.divName, this.maxItems);
                        this.getdataFromServer("delete_webPages", doc1);
                    }
                }
            }
        }
        this.window_factory(event, 'ob_menu_RequestBrowser', ob_delete_projects, 'hidden');
    }
    catch
            (e) {
        __openbexi_debugC("openbexi_navigator.prototype.removeWebPages()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.addNewDatabase = function (event) {
    try {
        var privateDoc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var connectionCount = get_xml_classe_object_attribut_value(privateDoc, "ob_database", "connection", "count");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connectionCount, "myName", "myName" + connectionCount);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connectionCount, "url", "jdbc:url" + connectionCount);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connectionCount, "driver", "");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connectionCount, "user", "user" + connectionCount);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "database_" + connectionCount, "passwd", "");
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "connection", "count", parseInt(connectionCount) + 1);
        privateDoc = set_xml_classe_object_attribut_value(privateDoc, "ob_database", "connection", "connected", "false");
        openbexi_set_OPENBEXI_PRIVATE_CONTEXT_XML(openbexi_get_xmlString(privateDoc));
        openbexi_savePrivateData(event);
        openbexiNavigator.window_factory(null, 'ob_menu_RequestBrowser', ob_SQL_database, 'maximize');

        if (document.getElementById("bexicontext_database"))    document.getElementById("bexicontext_database").value = "myName" + connectionCount;
        if (document.getElementById("bexicontext_url"))    document.getElementById("bexicontext_url").value = "jdbc:url" + connectionCount;
        if (document.getElementById("bexicontext_username"))    document.getElementById("bexicontext_username").value = "user" + connectionCount;
        if (document.getElementById("bexicontext_passwd"))    document.getElementById("bexicontext_passwd").value = "";
        if (document.getElementById("bexicontext_driver"))    document.getElementById("bexicontext_driver").value = "";

    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.addNewDatabase()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.check_If_WebPage_exists = function () {
    try {
        var webPagesDoc = openbexi_get_documentElement(this.OPENBEXI_WEBPAGES_DATA_XML, "text/xml");
        var objectMaxCount = get_xml_classe_object_attribut_value(webPagesDoc, "ob_explorer", "file", "objectMaxCount");
        var current_filename;
        for (var j = 0; j < parseInt(objectMaxCount); j++) {
            current_filename = get_xml_classe_object_attribut_value(webPagesDoc, "ob_explorer", "file_" + j, "filename");
            if (current_filename == this.HTML_pageName) return true;
        }
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.check_If_WebPage_exists()", "Exception:" + e.message);
    }
    return false;
}
openbexi_navigator.prototype.addNewWebPage = function (event) {
    try {
        if (this.check_If_WebPage_exists(event))return;
        var webPagesDoc = openbexi_get_documentElement(this.OPENBEXI_WEBPAGES_DATA_XML, "text/xml");
        var objectMaxCount = get_xml_classe_object_attribut_value(webPagesDoc, "ob_explorer", "file", "objectMaxCount");
        if (this.HTML_pageName == undefined || this.HTML_pageName == null)
            this.HTML_pageName = prompt("You need to rename this HTML page:", "no_name" + objectMaxCount + ".html");
        this.HTML_pageName = openbexi_clearText(this.HTML_pageName);
        if (this.HTML_pageName == null || this.HTML_pageName == "") {
            this.HTML_pageName = "no_name" + objectMaxCount + ".html";
        }
        webPagesDoc = set_xml_classe_object_attribut_value(webPagesDoc, "ob_request", "request", "subtype", "webPages");
        webPagesDoc = set_xml_classe_object_attribut_value(webPagesDoc, "ob_explorer", "file_" + objectMaxCount, "filename", this.HTML_pageName);
        webPagesDoc = set_xml_classe_object_attribut_value(webPagesDoc, "ob_explorer", "file_" + objectMaxCount, "type", "web");
        webPagesDoc = set_xml_classe_object_attribut_value(webPagesDoc, "ob_explorer", "file", "objectMaxCount", parseInt(objectMaxCount) + 1);
        webPagesDoc = set_xml_classe_object_attribut_value(webPagesDoc, "ob_explorer", "file", "objectCount", parseInt(objectMaxCount) + 1);
        this.OPENBEXI_WEBPAGES_DATA_XML = openbexi_get_xmlString(webPagesDoc);
        openbexi_saveXMLFile(this.openbexi_home_directory + "webPages_bexicontext.xml", this.OPENBEXI_WEBPAGES_DATA_XML);
        openbexi_navigator_CB(this.OPENBEXI_WEBPAGES_DATA_XML, null);
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.addNewWebPage()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.go_to_the_last_webPage = function (event) {
    try {
        openbexi_stopEventPropagation(event);
        if (this.working) return;
        var mode = openbexi_getWebPrivateData(null, "bexicontext", "mode", "name");
        if (mode == "") {
            return;
        }
        var navigator_mode = openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode");
        var current_project = openbexi_getWebPrivateData(null, "bexicontext", "project", "name");
        var current_page = openbexi_getWebPrivateData(null, "bexicontext", "page", "name");
        if (current_project == "") {
            current_project = "no_name";
            current_page = "no_name";
        }
        if (this.projectName == current_project && this.projectName == current_project) {
            //return;
        }
        this.projectName = current_project;
        this.filename = current_project;
        if (navigator_mode == "ob_template")
            this.open_web_template_page(current_project, current_page, false);
        else
            this.open_web_project_page(current_project, current_page, false);

    } catch (e) {
        __openbexi_debugC("openbexi_pager.prototype.go_to_the_last_webPage()", "Exception:" + e.message);
    }
}
openbexi_navigator.prototype.SaveAsTemplate = function () {
    if (getSelectedBexiObj(null) == openbexiBody) {
        if (document.getElementById("ob_theme_template"))
            this.templateCategory = openbexi_clearText(document.getElementById("ob_theme_template").value);
        if (this.templateCategory == "") this.templateCategory = "no_name";
        if (document.getElementById("ob_template_name"))
            this.templateName = openbexi_clearText(document.getElementById("ob_template_name").value);
        if (this.templateName == "") this.templateName = "no_name";
        this.open_project(null, "openbexi_createTemplateCategoryRequest");
    }
    else
        alert("Sorry, not yet implemented!\nPlease check for newer versions of OpenBEXI!");
}
openbexi_navigator.prototype.getObjects = function (ob_doc, objects) {
    try {
        if (ob_doc == null) ob_doc = objects;
        var ob_lang = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
        var lang = get_xml_classe_object_attribut_value(ob_lang, "bexicontext", "language", "name");
        var maxItems = 0;
        var maxCountFiles = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file", "objectMaxCount");
        var posCurrentItem = 0;
        var nextPreviousStatus = 0;
        var subtype = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        var dirType = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "type");
        var number = get_xml_classe_object_attribut_value(ob_doc, "ob_ssh", "connection", "number");
        var pagerNumber = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "number");
        var current_path = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path");
        var filter = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "filter");
        var fileFilter = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "filter");

        var parent = null;
        var countFile = 0;

        maxItems = parseInt(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "maxItems"));
        posCurrentItem = parseInt(get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "posCurrentItem"));
        nextPreviousStatus = get_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextPreviousStatus");
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dirUp", "path", "none");
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "next");
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "previousFlag", "previous");
        var newposCurrentItem = 0;
        var max = maxItems;
        if (nextPreviousStatus == "next") {
            if (parseInt(posCurrentItem) == 0) {
                posCurrentItem = parseInt(maxItems);
                max = parseInt(posCurrentItem) + parseInt(maxItems);
                newposCurrentItem = posCurrentItem;
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "next");
                if ((parseInt(maxCountFiles) - parseInt(posCurrentItem)) < parseInt(maxItems))
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "null");
                else
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "next");
            } else if ((parseInt(maxCountFiles) - parseInt(posCurrentItem)) <= parseInt(maxItems)) {
                max = parseInt(posCurrentItem) + (parseInt(maxCountFiles) - parseInt(posCurrentItem));
                newposCurrentItem = posCurrentItem;
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "null");
            } else {
                posCurrentItem = parseInt(posCurrentItem) + parseInt(maxItems);
                max = parseInt(posCurrentItem) + parseInt(maxItems);
                newposCurrentItem = posCurrentItem;
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "next");
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "previousFlag", "previous");
                if (parseInt(maxCountFiles) - parseInt(posCurrentItem) < parseInt(maxItems))
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "null");
                else
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "next");
            }
        } else if (nextPreviousStatus == "previous") {
            if (parseInt(posCurrentItem) == 0) {
                max = parseInt(maxItems);
                newposCurrentItem = 0;
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "previousFlag", "null");
            } else {
                posCurrentItem = parseInt(posCurrentItem) - parseInt(maxItems);
                max = parseInt(posCurrentItem) + parseInt(maxItems);
                newposCurrentItem = posCurrentItem;
                if (parseInt(posCurrentItem) < parseInt(maxItems))
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "previousFlag", "null");
            }
        } else {
            if (pagerNumber == "" || pagerNumber == "none") pagerNumber = "0";
            if (pagerNumber == "previousBegin") pagerNumber = "0";
            if (pagerNumber == "nextEnd")
                pagerNumber = parseInt(parseInt(maxCountFiles) / parseInt(maxItems));
            newposCurrentItem = parseInt(pagerNumber) * parseInt(maxItems);
            posCurrentItem = newposCurrentItem;
            max = parseInt(parseInt(posCurrentItem) + parseInt(maxItems));
            ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "previousFlag", "null");
            if ((parseInt(maxCountFiles) - parseInt(posCurrentItem)) <= parseInt(maxItems)) {
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "nextFlag", "null");
            }
        }
        // Read objects
        if (parseInt(maxCountFiles) < parseInt(max)) max = maxCountFiles;
        var path = get_xml_classe_object_attribut_value(objects, "ob_explorer", "dir", "path");
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "dir", "path", path);
        var filename = "";
        var myName = "";
        var host = "";
        var type = "";
        var website = "";
        var icon = "";
        for (var j = parseInt(posCurrentItem); j < parseInt(max); j++) {
            filename = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "filename");
            type = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "type");
            ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "filename", filename);
            ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "type", type);
            if (subtype == "sftpinit" || subtype == "sftp") {
                website = get_xml_classe_object_attribut_value(objects, "ob_ssh", "connection_" + j, "website");
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "filename", website);
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "type", "dir");
            }
            if (subtype == "database") {
                myName = get_xml_classe_object_attribut_value(objects, "ob_database", "database_" + j, "myName");
                host = get_xml_classe_object_attribut_value(objects, "ob_database", "database_" + j, "url");
                if (myName != "")
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "filename", myName);
                else
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "filename", host);
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + j, "type", "dir");
            }
            if (subtype == "google") {
                website = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "website");
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "website", website);
            }
            if (subtype == "templates") {
                icon = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "icon");
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "icon", icon);
            }
            if (subtype == "javascripts") {
                icon = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "icon");
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "icon", icon);
                var specification = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "specification_" + lang);
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "specification_" + lang, specification);
                var parameterCount = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "parameterCount");
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "parameterCount", parameterCount);
                var trigger = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + j, "event");
                ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "event", trigger);
                for (var p = 0; p < parseInt(parameterCount); p++) {
                    var parameterName = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + countFile, "parameterName_" + p);
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "parameterName_" + p, parameterName);
                    var parameterSpecification = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + countFile, "parameterSpecification_" + p + "_" + lang);
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "parameterSpecification_" + p + "_" + lang, parameterSpecification);
                    var parameterType = get_xml_classe_object_attribut_value(objects, "ob_explorer", "file_" + countFile, "parameterType_" + p);
                    ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file_" + countFile, "parameterType_" + p, parameterType);
                }
            }
            countFile++;
        }
        var ipagerNumber = parseInt(parseInt(newposCurrentItem) / parseInt(maxItems));
        var maxPagerNumber = parseInt(parseInt(countFile) / parseInt(maxItems));
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "number", ipagerNumber);
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "pager", "maxNumber", maxPagerNumber);
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectCount", countFile);
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "file", "objectMaxCount", maxCountFiles);
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text", "done");
        if (parseInt(countFile) == 0) {
            ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "status", "text", "none");
        }
        ob_doc = set_xml_classe_object_attribut_value(ob_doc, "ob_explorer", "list", "posCurrentItem", newposCurrentItem);
        return ob_doc;
    } catch (e) {
        __openbexi_debugC("openbexi_navigator.prototype.getObjects()", "Exception:" + e.message);
        return doc;
    }
}
function openbexi_addPageTitle(event) {
    try {
        var ob_titlePage = openbexi_getPageData(null, "page", "title", "text");
        if (ob_titlePage == "") {
            ob_titlePage = "Created with OPEN BEXI htmlbuilder-http://sourceforge.net/projects/ob-htmlbuilder";
            openbexi_updatePageData(null, "page", "title", "text", ob_titlePage);
        }
        openbexiNavigator.prompt(event, ob_addPageTitle);
    } catch (e) {
        __openbexi_debugC("openbexi_addPageTitle()", "Exception:" + e.message);
    }
}

function openbexi_addMetaTags(event) {
    try {
        var ob_metaTags = openbexi_getPageData(null, "page", "metaTags", "text");
        if (ob_metaTags == "") {
            ob_metaTags = "Created with OPEN BEXI htmlbuilder-http://sourceforge.net/projects/ob-htmlbuilder";
            openbexi_updatePageData(null, "page", "metaTags", "keywords", ob_metaTags);
        }
        openbexiNavigator.prompt(event, ob_addMetaTags);
    } catch (e) {
        __openbexi_debugC("openbexi_addMetaTags()", "Exception:" + e.message);
    }
}

function openbexi_deleteFile_CB(responseXML) {
    try {
        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var status = get_xml_classe_object_attribut_value(ob_doc, "openbexi_creative", "application", "status");
        if (status != "ok") {
            openbexiNavigator.status(status);
            return;
        }
        var fileName = get_xml_classe_object_attribut_value(ob_doc, "file", "html", "name");
        var current_fileName = get_xml_classe_object_attribut_value(ob_doc, "file", "current_html", "name");
        var url = get_xml_classe_object_attribut_value(ob_doc, "file", "html", "url_default");
        openbexiNavigator.set_mode("getWebPages");
        openbexiNavigator.display(null, 0);
        openbexiNavigator.status("File: " + fileName + "\nsuccessfully deleted", "#abff4b");
    } catch (e) {
        __openbexi_debugC("openbexi_deleteFile_CB()", "Exception:" + e.message);
    }
}

function ob_email(subject, body_message) {
    try {
        var daReferrer = document.referrer;
        var email = "arcazj@netscape.net";
        var errorMsg = "error";
        var mailto_link = 'mailto:' + email + '?subject=' + subject + '&body=' + body_message;

        var win = window.open(mailto_link, 'emailWindow');
        if (win && win.open && !win.closed) win.close();
    } catch (e) {
        __openbexi_debugC("ob_email()", "Exception:" + e.message);
    }
}

function ob_load_css(file) {
    try {
        var oLink = document.createElement("link");
        oLink.href = file;
        oLink.rel = "stylesheet";
        oLink.type = "text/css";
        document.body.appendChild(oLink);
    } catch (e) {
        __openbexi_debugC("ob_load_css()", "Exception:" + e.message);
    }
}

;
function openbexi_navigator_CB(responseXML, event) {
    try {
        var ob_doc = openbexi_get_documentElement(responseXML, "text/xml");
        var request = get_xml_classe_object_attribut_value(ob_doc, "ob_request", "request", "subtype");
        if (request != "") __openbexi_debugC("openbexi_navigator_CB()", " Info: request type not found=");
        if (request == "delete_webPages" || request == "delete_webPageTemplates") {
            openbexiNavigator.set_webPageName("no_name");
            openbexiNavigator.HTML_pageName = "no_name.html";
            openbexiNavigator.deleteBodyWebPage(event, false);
            ob_setDirty_flag(false);
            openbexi_save_bexicontext();
            if (openbexiNavigator.HTML_pageName != "template.html")
                if (openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode") == "ob_template")
                    openbexiNavigator.open_web_template_page(openbexiNavigator.templateCategory, openbexiNavigator.HTML_pageName, false);
                else
                    openbexiNavigator.open_web_project_page(openbexiNavigator.projectName, openbexiNavigator.HTML_pageName, false);
            openbexiNavigator.top_frame_message("Project \"" + openbexiNavigator.projectName + "\" successfully deleted", "40px", "info");
        }
        if (request == "delete_webProjects" || request == "delete_webTemplateCategory") {
            openbexiNavigator.set_HTML_pageName(null);
            openbexiNavigator.projectName = "no_name";
            openbexiNavigator.HTML_pageName = "no_name.html";
            openbexi_updateWebPrivateData(null, "bexicontext", "project", "name", openbexiNavigator.projectName);
            openbexi_updateWebPrivateData(null, "bexicontext", "page", "name", openbexiNavigator.HTML_pageName);
            openbexiNavigator.window_factory(event, 'ob_menu_FileBrowser', null, 'minimize');
            if (document.getElementById('ob_menu_RequestBrowser') != null && document.getElementById('ob_menu_RequestBrowser').style.visibility != "hidden")
                openbexiNavigator.window_factory(event, 'ob_menu_RequestBrowser', 'hidden');
            openbexiNavigator.deleteBodyWebPage(event, false);
            if (openbexiNavigator.HTML_pageName != "template.html")
                if (openbexi_getWebPrivateData(null, "bexicontext", "ob_navigator", "mode") == "ob_template")
                    openbexiNavigator.open_project("ob_menu_FileBrowser_sub", "browseAllTemplates");
                else
                    openbexiNavigator.open_project("ob_menu_FileBrowser_sub", "browseAllProjects");
        }
        __openbexi_debugC("openbexi_navigator_CB()", "info: openbexi_navigator_CB completed");
    } catch (e) {
        __openbexi_debugC("openbexi_navigator_CB()", "Exception:" + e.message);
    }
    openbexi_unloading2();
}

function openbexi_getBexiObj(event, divName, divtriggerId, objectSelected, parameterName, parameterName2) {
    try {
        openbexi_stopEventPropagation(event);
        objectSelected = "BODY";
        try {
            objectSelected = getSelectedBexiObj(null).div.id;
        } catch (e) {
        }
        var popupId = "popup_menu0";
        if (!openbexiPopup_menu) openbexiPopup_menu = new openbexi_popup_menu(popupId);
        openbexiPopup_menu.removeAllItemMenu();
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].type == "openbexi_button")
                openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setBexiObjEvent(event,' + '"' + divName + '' + '","' + openbexi_object[i].button.id + '' + '","' + openbexi_object[i].type + '' + '","' + divtriggerId + '","' + objectSelected + '","' + parameterName + '","' + parameterName2 + '")', openbexi_object[i].type + ":" + openbexi_object[i].button.id);
            openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setBexiObjEvent(event,' + '"' + divName + '' + '","' + openbexi_object[i].div.id + '' + '","' + openbexi_object[i].type + '' + '","' + divtriggerId + '","' + objectSelected + '","' + parameterName + '","' + parameterName2 + '")', openbexi_object[i].type + ":" + openbexi_object[i].div.id);
        }
        openbexiPopup_menu.addSep();
        openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexiPopup_menu.hideMenu(event)', "close");
        openbexiPopup_menu.showMenu3(event, popupId, divPropertiesWidth, true, divName.style.left, divName.style.top);
    } catch (e) {
        __openbexi_debugC("openbexi_getBexiObj()", "Exception:" + e.message);
    }
}

function openbexi_setBexiObjEvent(event, divName, bexiObjId, bexiObjType, divtriggerId, objectSelected, parameterName, parameterName2) {
    try {
        openbexi_stopEventPropagation(event);
        openbexi_updatePageData(null, "url_" + divtriggerId, objectSelected, parameterName, bexiObjId);
        openbexi_updatePageData(null, "url_" + (parseInt(divtriggerId) + 1), objectSelected, parameterName2, bexiObjType);
        openbexiPopup_menu.hideMenu();
        var urlCount = ob_getFunctionCurrentIndex(objectSelected);
        if (parseInt(urlCount) == -1) urlCount = 0;
        openbexi_display_javascript_parameters(event, null, null, urlCount);
    } catch (e) {
        __openbexi_debugC("openbexi_setBexiObjEvent()", "Exception:" + e.message);
    }
}

function openbexi_setJws_request_type(event, divName, requestType, bexiObjType, divtriggerId, objectSelected, parameterName) {
    try {
        openbexi_stopEventPropagation(event);
        openbexiPopup_menu.hideMenu();
        var urlCount = ob_getFunctionCurrentIndex(objectSelected);
        if (parseInt(urlCount) == -1) urlCount = 0;
        openbexi_updatePageData(null, "url_" + urlCount, objectSelected, parameterName, requestType);
        openbexi_display_javascript_parameters(event, null, null, urlCount);
    } catch (e) {
        __openbexi_debugC("openbexi_setBexiObjEvent()", "Exception:" + e.message);
    }
}

function open_jws_request_type(event, divName, divtriggerId, objectSelected, parameterName) {
    try {
        openbexi_stopEventPropagation(event);
        objectSelected = "BODY";
        try {
            objectSelected = getSelectedBexiObj(null).div.id;
        } catch (e) {
        }
        var popupId = "popup_menu0";
        if (!openbexiPopup_menu) openbexiPopup_menu = new openbexi_popup_menu(popupId);
        openbexiPopup_menu.removeAllItemMenu();
        var jws_request_type = [
            "file_reader",
            "ob_xml_reader",
            "ob_xml_simile_reader",
            "file_pipe",
            "command",
            "test"
        ];
        for (var i = 0; i < jws_request_type.length; i++) {
            openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setJws_request_type(event,' + '"' + divName + '' + '","' + jws_request_type[i] + '' + '","' + jws_request_type[i] + '' + '","' + divtriggerId + '","' + objectSelected + '","' + parameterName + '")', jws_request_type[i]);
        }
        openbexiPopup_menu.addSep();
        openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexiPopup_menu.hideMenu(event)', "close");
        openbexiPopup_menu.showMenu3(event, popupId, divPropertiesWidth, true, divName.style.left, divName.style.top);
    } catch (e) {
        __openbexi_debugC("open_jws_request_type()", "Exception:" + e.message);
    }
}

function openbexi_getMouseEvent(event, divName, divtriggerId, objectSelected) {
    try {
        openbexi_stopEventPropagation(event);
        if (objectSelected == null)
            try {
                objectSelected = getSelectedBexiObj(null).div.id;
            } catch (e) {
                objectSelected = "BODY";
            }
        var popupId = "popup_menu0";
        if (!openbexiPopup_menu) openbexiPopup_menu = new openbexi_popup_menu(popupId);
        openbexiPopup_menu.removeAllItemMenu();
        if (getSelectedBexiObj(null).type == "openbexi_dojo" && getSelectedBexiObj(null).subtype == "dojox.grid.Grid") {
            for (var i = 0; i < openbexi_grid_mouse_event.length; i++) {
                openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setMouseEvent(event,' + '"' + openbexi_grid_mouse_event[i] + '' + '","' + divName + '' + '","' + divtriggerId + '' + '","' + objectSelected + '' + '")', openbexi_grid_mouse_event[i]);
            }
        }
        else if (getSelectedBexiObj(null).type == "openbexi_body") {
            for (i = 0; i < openbexi_body_mouse_event.length; i++) {
                openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setMouseEvent(event,' + '"' + openbexi_body_mouse_event[i] + '' + '","' + divName + '' + '","' + divtriggerId + '' + '","' + objectSelected + '' + '")', openbexi_body_mouse_event[i]);
            }
        } else {
            for (i = 0; i < openbexi_mouse_event.length; i++) {
                openbexiPopup_menu.addItemMenu(popupId + "_" + i, 'openbexi_setMouseEvent(event,' + '"' + openbexi_mouse_event[i] + '' + '","' + divName + '' + '","' + divtriggerId + '' + '","' + objectSelected + '' + '")', openbexi_mouse_event[i]);
            }
        }
        openbexiPopup_menu.addSep();
        openbexiPopup_menu.addItemMenu(popupId + "_close", 'openbexiPopup_menu.hideMenu(event)', "close");
        openbexiPopup_menu.showMenu3(event, popupId, divPropertiesWidth, true, divName.style.left, divName.style.top);
    } catch (e) {
        __openbexi_debugC("openbexi_getMouseEvent()", "Exception:" + e.message);
    }
}

function openbexi_setMouseEvent(event, mouseEvent, divName, divtriggerId, objectSelected) {
    try {
        openbexi_stopEventPropagation(event);
        var urlCount = ob_getFunctionCurrentIndex(objectSelected);
        if (parseInt(urlCount) == -1) urlCount = 0;
        openbexi_updatePageData(null, "url_" + urlCount, objectSelected, "trigger", mouseEvent);
        //if (document.getElementById(divtriggerId))document.getElementById(divtriggerId).innerHTML = mouseEvent;
        openbexiPopup_menu.hideMenu();
        openbexi_display_javascript_parameters(event, null, null, urlCount);
    } catch (e) {
        __openbexi_debugC("openbexi_setMouseEvent()", "Exception:" + e.message);
    }
}

function openbexi_loading2(div_id, message) {
    try {
        if (div_id == "stop") {
            if (openbexiNavigator.working) {
                openbexi_unloading2();
                __openbexi_debugC("openbexi_loading2()", "Error: Auto clear performed ...");
            }
            clearTimeout(_ob_stop_navigator);
            return;
        }
        openbexiNavigator.set_working_status(true);
        var div = document.getElementById(div_id);
        var ob_loading2 = document.getElementById("ob_loading2");
        var ob_sub_loading2 = document.getElementById("ob_sub_loading2");
        var ob_txt_loading2 = document.getElementById("ob_txt_loading2");
        if (ob_loading2 == null) {
            ob_loading2 = document.createElement("div");
            ob_loading2.id = "ob_loading2";
            ob_loading2.style.position = "absolute";
            ob_loading2.style.visibility = "visible";
            ob_loading2.style.top = 138 + "px";
            ob_loading2.style.left = 0 + "px";

            ob_sub_loading2 = document.createElement("div");
            ob_sub_loading2.id = "ob_sub_loading2";
            ob_sub_loading2.style.position = "absolute";
            ob_sub_loading2.style.top = "370px";
            ob_sub_loading2.style.width = "40px";
            ob_sub_loading2.style.height = "37px";
            ob_sub_loading2.style.fontWeight = "bold";
            ob_sub_loading2.style.fontSize = "20px";

            var img = document.createElement("img");
            img.src = "gif/loading2.gif";
            img.style.width = "40px";
            img.style.height = "37px";

            ob_txt_loading2 = document.createElement("div");
            ob_txt_loading2.id = "ob_txt_loading2";
            ob_txt_loading2.style.position = "absolute";
            ob_txt_loading2.style.width = "200px"
            ob_txt_loading2.style.height = "25px";

            ob_sub_loading2.appendChild(img);
            ob_sub_loading2.appendChild(ob_txt_loading2);
            document.body.appendChild(ob_sub_loading2);
            document.body.appendChild(ob_loading2);
        } else {
            ob_loading2.style.visibility = "visible";
            ob_sub_loading2.style.visibility = "visible";

        }
        if (div != null) {
            if (message == undefined) message = "";
            document.getElementById("ob_txt_loading2").innerHTML = message;

            ob_loading2.style.zIndex = "99999";
            ob_sub_loading2.style.zIndex = ob_loading2.style.zIndex + 1;
            var menus_MaxLeft = openbexiNavigator.get_ob_menus_MaxLeft();
            if (menus_MaxLeft == 0) {
                ob_sub_loading2.style.left = (parseInt(openbexi_getWindowWidth()) / 2.4) + "px";
                ob_loading2.style.width = parseInt(openbexi_getWindowWidth()) + "px";
            }
            else {
                ob_sub_loading2.style.left = (menus_MaxLeft / 2.4) + "px";
                ob_loading2.style.width = parseInt(menus_MaxLeft) + "px";
            }
            ob_loading2.style.height = parseInt(openbexi_getWindowHeight()) + "px";
            __openbexi_debugC("openbexi_loading2()", "Warning: Setting openbexiNavigator.working to true");
            var goInBg;
            var fade_indexBg = 15;

            function fadeInBg(ob_loading2) {
                if (ob_loading2.style.visibility == "hidden") return;
                openbexi_opacity(ob_loading2, fade_indexBg);
                fade_indexBg += 6;
                goInBg = setTimeout(function () {
                    fadeInBg(ob_loading2);
                }, 70);
                if (fade_indexBg >= 80) {
                    clearTimeout(goInBg);
                }
            }

            fadeInBg(ob_loading2);
        }
        var div_img = document.getElementById("ob_menu_RequestBrowser_close_img");
        if (div_img != null) {
            div_img.src = "gif/loading2.gif";
        }
        var _ob_stop_navigator = setTimeout(function () {
            openbexi_loading2("stop");
        }, openbexiNavigator.load_timeout);
    } catch (e) {
        __openbexi_debugC("openbexi_loading2()", "Exception:" + e.message);
    }
    __openbexi_debugC("openbexi_loading2()", "Warning: Setting openbexiNavigator. Working to true (message=" + message + ")");
}

function openbexi_unloading2() {
    try {
        openbexiNavigator.set_working_status(false);
        openbexiNavigator.load_timeout = 15000;
        var ob_loading2 = document.getElementById("ob_loading2");
        if (ob_loading2)
            ob_loading2.style.visibility = "hidden";
        var ob_sub_loading2 = document.getElementById("ob_sub_loading2");
        if (ob_sub_loading2)
            ob_sub_loading2.style.visibility = "hidden";
        var div_img = document.getElementById("ob_menu_RequestBrowser_close_img");
        if (div_img != null) {
            div_img.src = "gif/close_x32.png";
        }
    } catch (e) {
        __openbexi_debugC("openbexi_unloading2()", "Exception:" + e.message);
    }
    __openbexi_debugC("openbexi_unloading2()", "Warning: Clear openbexiNavigator.working to false");
}

function openbexi_applyFilter(event) {
    try {
        if ((getBrowser() == "ie6" || getBrowser() == "ie7" || getBrowser() == "ie7_no_XMLHttpRequest") && !event) event = window.event;
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13 || keyCode == 1) {
            openbexiNavigator.browse_picture("", "dir", openbexi_system.openbexi_stringReplaceAll(_ob_picture_current_path_text, " ", "-##-"), "gallery", true, false);
        }
    } catch (e) {
        __openbexi_debugC("openbexi_applyFilter()", "Exception:" + e.message);
    }
}

var goInBody_side;

function ob_fadeInBody() {
    try {
        openbexi_updatePageData(null, "page", "fade", "status", "true");
        clearTimeout(goInBody_side);
        var fade_indexBody = 1.0;

        function fadeInBody(fade_indexBody) {
            try {
                fade_indexBody -= 0.1;
                for (var i = 0; i < openbexi_object.length; i++) {
                    if (openbexi_object[i].div.ob_template == "false") {
                        openbexi_object[i].div.style.opacity = fade_indexBody;
                        //if (fade_indexBody <= 0.5)
                        //openbexi_object[i].div.style.boxShadow = "10px 10px 50px 20px black inset";
                    }
                }
                if (fade_indexBody <= 0.3)
                    clearTimeout(goInBody_side);
                else
                    goInBody_side = setTimeout(function () {
                        fadeInBody(fade_indexBody);
                    }, 120);
                if (openbexi_object[i].div.ob_template == undefined)  clearTimeout(goInBody_side);
            } catch (e) {
            }
        }

        fadeInBody(fade_indexBody);
    } catch (e) {
        __openbexi_debugC("ob_fadeInBody()", "Exception:" + e.message);
    }
}

function ob_undofadeInBody() {
    try {
        if ((openbexi_getPageData(null, "page", "fade", "status") == "false")) return;
        openbexi_updatePageData(null, "page", "fade", "status", "false");
        for (var i = 0; i < openbexi_object.length; i++) {
            if (openbexi_object[i].div.ob_template == "false") {
                openbexi_object[i].div.style.opacity = 1.0;
            }
        }
    } catch (e) {
        __openbexi_debugC("ob_fadeInBody()", "Exception:" + e.message);
    }
}
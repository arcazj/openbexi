/* This notice must be untouched at all times.

Copyright (c) 2005-2013 JC Arcaz. All rights reserved.
OPEN OPENBEXI HTML Builder for generating dynanic HTML page and html code source from browsers.
updated: September 28 2013 version 5.0
The latest version is available at http://www.openbexi.com
                                                                                         4
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
OPEN OPENBEXI htmlbuilder uses the DHTML libraries from www.walterzorn.com for resizing and dragging pictures and layers (LGPL).
*/

var bexi_language = [
        ['ar'],['bg'],['bs'],['zh'],['cs'],['da'],['de'],['el'],['en'],['eo'],['es'],['et'],['fi'],['fr'],['he'],['hu'],['it'],['ja'],['ko'],['nl'],['np'],['pl'],['pt'],['ro'],['ru'],['sv'],['tr'],['uk'],['vi']];
var bexi_language2 = [
        ['Arabic'],['Bulgarian'],['Bosnian'],['Chinese'],['Czech'],['Danish'],['German'],['Greek'],['English'],['Esperanto'],['Spanish'],['Estonian'],['Finnish'],['French'],['Hebrew'],['Hungarian'],['Italian'],['Japanese'],['Korean'],['Dutch'],['Norwegian'],['Polish'],['Portuguese'],['Romanian'],['Russian'],['Swedish'],['Turkish'],['Ukrainian'],['Vietnamese']];
//English
var ob_Lang_en =
{
    Save                : "Save",
    SaveAs              : "Save as",
    NewPage             : "New Page",
    Preview             : "Preview",
    Cut                 : "Cut",
    Copy                : "Copy",
    Paste               : "Paste",
    ListWebPage         : "Web pages",

    PasteText           : "Paste as plain text",
    PasteWord           : "Paste from Word",
    PasteHtmlCode       : "Paste as HTML code",
    Print               : "Print",
    SendToBack          : "Send to back",
    BringToFront        : "Bring to front",
    DuplicateButton     : "Duplicate button",
    Duplicate           : "Duplicate selected item",
    DeleteWebPage       : "Delete current Web page",
    DeletePage          : "Delete page",
    Page                : "Page",
    RelativePage        : "RelativePage",
    Box                 : "Box",
    Node                : "Node",
    text_edit           : "Insert/Edit text area",
    Button              : "Button",
    List                : "List",
    NumberedListLbl     : "Numbered List",
    DlgSelectBtnDelete  : "Delete",
    RemoveAllItems      : "Remove all Web page items",
    RemoveAllPageItems  : "Remove all items",
    EnableOverflow      : "Enable overflow",
    DisableOverflow     : "Disable overflow",
    RemoveGridLine      : "Remove grid line",
    ReadXMLDatabase     : "Read XML database",
    ReadExcelText       : "Read CVS (Excel) text",
    CopyPasteTable      : "Copy Paste formated text",
    addFunction         : "Add function",

    BodyEditor          : "Body editor",
    ButtonEditor        : "Button editor",
    ClockEditor         : "Clock editor",
    DivBoxEditor        : "DivBox editor",
    FormEditor          : "Form editor",
    ImageEditor         : "Image editor",
    LineEditor          : "Line editor",
    LinkEditor          : "Link editor",
    ListEditor          : "List editor",
    MediaEditor         : "Media editor",
    NodeEditor          : "Node editor",
    DivPageEditor       : "Div\/Page Editor",
    TableEditor         : "Table editor",
    TextfieldEditor     : "Textfield editor",

    AddEdge             : "Add edge",
    ClearEdge           : "Clear edge",
    AddTextEdge         : "Add text edge",
    DeleteTextEdge      : "Delete text edge",

    AlignLeftAutoArrange        : "Aligning left from selected object",
    AlignRightAutoArrange       : "Aligning right from selected objec",
    AlignTopAutoArrange         : "Aligning top from selected object",
    AlignBottomAutoArrange      : "Aligning bottom from selected object",
    HorizontalSpacingAutoArrange: "Add horizontal spacing for all horizontal objects from selected object",
    VerticalSpacingAutoArrange  : "Add horizontal spacing for all vertical objects from selected object",
    VerticalHeightAutoResize    : "Resize height for all vertical objects from selected height object",
    VerticalWidthAutoResize     : "Resize width for all vertical objects from selected width object",
    HorizontalHeightAutoResize  : "Resize height for all horizontal objects from selected height object",
    HorizontalWidthAutoResize   : "Resize width for all horizontal objects from selected width object",
    UndoAutoArrange             : "undo auto arrange",
    RedoAutoArrange             : "rendo auto arrange",

    selectPageInsertHTML    : "Please select a page, before inserting a html element",
    enterObjectNameFunction : "Enter the function name for the selected object",
    enterObjectURL          : "Enter the full URL for the selected object",
    typeHorizontalSpacing   : "Please, type the spacing between horizontal objects (in pixel)",
    typeVerticalSpacing     : "Please, type the spacing between vertical objects (in pixel)",
    Notconnected            : "Warning: to fully use this feature, you must be connected to a OPEN BEXI web server",
    NoDatabaseList          : "Sorry, cannot get the database list",
    NoDatabaseConnected     : "Sorry, not connected to a database",
    CannotAddDatabase       : "Sorry, cannot add a database instance",
    CannotRemoveDatabase    : "Sorry, cannot remove a database instance",
    CannotSetDatabase       : "Sorry, cannot set up a database instance",
    NotImplemented          : "Sorry, function not implemented yet",
    CannotSaveFile          : "Sorry, cannot save the file",
    SaveFileOK              : "File successfully saved",
    Help                    : "Online help",
    UsedLanguage            : "The used language is English",
    Loading                 : "loading ...",
    LoadingDone             : "loading done",
    noTemplate              : "Sorry, no template found for this object",
    SQLErrorData            : "No data found because no SQL server is running ...",
    SQLNoData               : "No data found ...",
    OPENBEXIReady           : "OPEN BEXI Creative is ready\nThe used language is English",
    actionNotPermitted      : "Sorry, the action you attempted is not permitted",
    PleaseSelectAProject    : "Please, select, create or delete a project ...",
    PleaseSelectAWebPage    : "Please, select, create or delete a Web page ...",
    PleaseSelectATemplateCategory: "Please, select, create or delete a template category ...",
    PleaseSelectATemplate: "Please,  select, create or delete a template ...",
    ProjectNotExist         : "This project does not exist anymore...",
    ProjectAlreadyExit      :"The project already exist",
    ProjectCreated          :"The project has been successfully created",
    TemplateCreated          :"The template has been successfully created",
    PageAlreadySaved         : "This page is already saved ...",
    TemplateAlreadyExit     : "This template is already created ...",
    CategoryTemplateNotExist: "This template category does not exist anymore...",
    TemplateCategoryAlreadyExist:  "This template category is already created ...",
    CannotCreateTemplateCategory: "Cannot create this template category ...",
    CannotDeleteTemplateCategory: "Cannot delete this template category ...",
    CannotDeleteFile        :"Cannot delete this file ...",
    CannotCreateProject     : "Cannot create the project ...",
    CannotDeleteProject     : "This project has not been removed properly ...",
    submitToCommunity       : "Submit this template to the community ...",
    publisher               : "Publish current WEB page",
    NoOpenPage              : "Sorry, No open WEB page found ...",
    CannotReadPage          : "Sorry, cannot read page ...",
    Go_to_the_last_working_web_page : "Go to the last working web page",
    Open_last_web_page      :"Open the last webpage on which you are working on",
    Open_project            :"Open a project",
    Open_new_project        :"Open a new project",
    Open_template           :"Create a new page from a template",
    Rename_button           :"Rename this button",
    Change_color            :"Change the background color",
    Change_font             :"Change the font",
    Change_font_weight          :"Change the font weight",
    Change_font_size        :"Change the font size",
    Change_font_style       :"Change the font style",
    Change_background_img   :"Change the background image",
    Change_template         :"Change the template",
    Edit_CSS                :"Change CSS from an editor",
    Add_triggers            :"Add javascript triggers",
    Enter_caption           :"Enter caption"

};

//Spanish

var ob_Lang_es =
{
// Inspector
    ConfigurationHelp       : "Configuration - ayuda",
//Webpagetool        : "???",
//WebpageName        : "???",
    properties          : "características",

    SendToBack          : "Traer adelante",
    BringToFront        : "Enviar atras",
    Duplicate           : "Duplicado",
    NumberedListLbl     : "Numeración",
    DlgSelectBtnDelete  : "Eliminar",
    RemoveAllPageItems  : "suprima todos los elementos",
    RemoveAllItems      : "suprima todos los elementos del HTML",

//    Save                : "???",
//    NewPage             : "???",
//    Preview             : "???",
    DeleteWebPage       : "Suprimir la página Internet",
    DeletePage          : "Suprimir la página",
    EnableOverflow      : "Permita El Desbordamiento",
    DisableOverflow     : "Inhabilite El Desbordamiento",

//PasteText           : "???",
//PasteWord           : "???",
    PasteHtmlCode       : "Código Del HTML De la Goma",

    Page                : "Página",
    Box                 : "Caja",
    Node                : "Nodo",
//    Form                : "???",
//    Checkbox            : "???",
//    RadioButton         : "???",
//    TextField           : "???",
//    text_edit           : "???",
//    Button              : "???",
//    SelectionField      : "???",
//    Clock               : "???",
//    Media               : "???",
//    Calendar            : "???",

//    EditLink            : "???",
//    InsertRow           : "???",
//    DeleteRows          : "???s",
//    InsertColumn        : "???",
//    DeleteColumns       : "???",
//    RemoveGridLine      : "???",
    ReadXMLDatabase     : "Lea La Base de datos de XML",
    ReadExcelText       : "Lea Excel El Texto",
//    CopyPasteTable      : "???",
//    addFunction      : "???",

    BodyEditor          : "Editor de páginas web",
    ButtonEditor        : "Editor de Botón",
    CheckboxEditor      : "Editor de Casilla de Verif.",
    ClockEditor         : "Editor de reloj",
    DivBoxEditor        : "Editor de Div",
    FormEditor          : "Editor de Formulario",
    ImageEditor         : "Editor de imagen",
    LineEditor          : "Editor de línea",
    LinkEditor          : "Editor de vínculo",
    ListEditor          : "Editor de viñetas",
    MediaEditor         : "Editor de media",
//NodeEditor          : "Editor de node",
    DivPageEditor       : "Editor de páginas",
    TableEditor         : "Editor de Tabla",
    TextfieldEditor     : "Editor de Area de Texto",
//ActionEditor       : "???",

//    AddEdge             : "???",
//    ClearEdge           : "C???",
//    AddTextEdge         : "???",
//    DeleteTextEdge      : "???",

//    AlignLeftAutoArrange: "???"

//    AlignRightAutoArrange       : "???",
//    AlignTopAutoArrange         : "???",
//    AlignBottomAutoArrange      : "???",
//    HorizontalSpacingAutoArrange: "???",
//    VerticalSpacingAutoArrange  : "???",
//    VerticalHeightAutoResize    : "???",
//    VerticalWidthAutoResize    : "???",
//    HorizontalHeightAutoResize  : "???",
//    HorizontalWidthAutoResize  : "???",
//    UndoAutoArrange             : "???",
//    RedoAutoArrange             : "???",

//    selectPageInsertHTML   : "???",
//    enterObjectNameFunction: "???",
//    enterObjectURL         : "???",
//    typeVerticalSpacing    : "???",
//    typeHorizontalSpacing  : "???",
//    Notconnected           : "???",
//    NotImplemented         : "???",
    Help                     : "ayuda en línea"

}

//French

var ob_Lang_fr =
{
// Inspector
    ConfigurationHelp : "Configuration-Aide",
    Webpagetool        : "Outils page Web",
    WebpageName        : "Selectionner une page web",
    properties         : "Propriétés",

    SendToBack         : "Positionner en arriere plan",
    BringToFront       : "Positionner en premier plan",
    Duplicate          : "Dupliquer l\' élément selectionné",
    DlgSelectBtnDelete : "Supprimer",
    RemoveAllItems     : "Supprimer tous les éléments de la page Web",
    RemoveAllPageItems : "Supprimer tous les éléments de la page",

    Save                : "Enregistrer",
    SaveAs              : "Enregistrer sous",
    NewPage             : "Nouvelle page",
    Preview             : "Prévisualisation",
    DeleteWebPage       : "Supprimer la page web courante",
    DeletePage       : "Supprimer la page",
    EnableOverflow      : "Visualiser le débordement",
    DisableOverflow     : "Cacher le débordement",
    ListWebPage         : "pages Web",


    PasteText           : "Coller du texte",
    PasteWord           : "Coller du texte Word",
    PasteHtmlCode       : "Coller du code HTML",
    Print               : "Imprimer",
    addFunction         : "Attacher une fonction",
    InsertLink          : "Insérer un lien",
    RemoveLink          : "Supprimer le lien",
    InsertImage         : "Insérer une image",
    InsertTable         : "Insérer un tableau",
    InsertLine          : "Insérer un séparateur",
    About               : "A propos de OPEN BEXI HTML Builder",
    BulletedListLbl     : "Liste à puces",
    NumberedListLbl     : "Insérer une liste",

    Page                : "Insérer une page (ou div)",
    Box                 : "Insérer une boite",
    Form                : "Insérer un formulaire",
    Node                : "Insérer un node",
    Checkbox            : "Insérer une case à cocher",
    RadioButton         : "Insérer un bouton radio",
    TextField           : "Insérer un champ texte",
    text_edit           : "Insérer un texte",
    button              : "Insérer un bouton",
    SelectionField      : "Insérer une liste/menu",
    Clock               : "Insérer une horloge",
    Media               : "Insérer un film ou un flash",
    Calendar            : "Insérer un calendrier",
    List                : "Insérer une liste",

    EditLink            : "Modifier le lien",
    InsertRow           : "Insérer une ligne",
    DeleteRows          : "Supprimer des lignes",
    InsertColumn        : "Insérer une colonne",
    DeleteColumns       : "Supprimer des colonnes",
    RemoveGridLine      : "Supprimer la grille",
    ReadXMLDatabase     : "Importer un fichier XML",
    ReadExcelText       : "Importer un fichier au format CVS (Excel)",
    CopyPasteTable      : "Copier coller du texte vers la table",

    BodyEditor          : "Editeur HTML",
    ButtonEditor        : "Editeur de bouton",
    CheckboxEditor      : "Editeur de case à cocher",
    ClockEditor         : "Editeur d\' horloge",
    DivBoxEditor        : "Editeur de boite",
    FormEditor          : "Editeur de formulaire",
    ImageEditor         : "Editeur d\' image",
    LineEditor          : "Editeur de ligne",
    LinkEditor          : "Editeur de lien",
    ListEditor          : "Editeur de liste",
    MediaEditor         : "Editeur video\/flash",
    NodeEditor          : "Editeur de graphe",
    DivPageEditor       : "Editeur de page",
    TableEditor         : "Editeur de Table",
    TextfieldEditor     : "Editeur de champs",

    AddEdge             : "Ajouter un lien entre deux nodes",
    ClearEdge           : "Enlever un lien entre deux nodes",
    AddTextEdge         : "Ajouter un texte entre deux nodes",
    DeleteTextEdge      : "Enlever un texte entre deux nodes",

    AlignLeftAutoArrange       : "Aligner à gauche à partir de l\'objet selectionné",
    AlignRightAutoArrange      : "Aligner à droite à partir de l\'objet selectionné",
    AlignTopAutoArrange        : "Aligner en haut à partir de l\'objet selectionné",
    AlignBottomAutoArrange     : "Aligner en bas à partir de l\'objet selectionné",
    HorizontalSpacingAutoArrange: "Ajouter un espace entre tous les objets horizontaux à partir de l\'objet selectionné",
    VerticalSpacingAutoArrange : "Ajouter un espace entre tous les objets verticaux à partir de l\'objet selectionné",
    VerticalHeightAutoResize   : "Retailler la hauteur de tous les objets verticaux à partir de l\'objet selectionné",
    VerticalWidthAutoResize    : "Retailler la largeur de tous les objets verticaux à partir de l\'objet selectionné",
    HorizontalHeightAutoResize : "Retailler la hauteur de tous les objets horizontaux à partir de l\'objet selectionné",
    HorizontalWidthAutoResize  : "Retailler la largeur de tous les objets horizontaux à partir de l\'objet selectionné",
    UndoAutoArrange            : "Annuler la dernière action",
    RedoAutoArrange            : "Refaire la dernière action",

// Alerts and Messages
    selectPageInsertHTML    : "SVP, sélectionner une page avant d\'insérer un object HTML",
    enterObjectNameFunction : "Entrer le nom de la fonction associée à l\'objet selectionné",
    enterObjectURL          : "Entrer l' URL associée à ce bouton",
    typeVerticalSpacing     : "SVP, donner l'intervalle entre objets verticaux (en pixel)",
    typeHorizontalSpacing   : "SVP, donner l'intervalle entre objets horizontaux (en pixel)",
    Notconnected            : "Désolé, pour utiliser toute cette fonction, vous devez etre connecté à un server Web OPEN BEXI",
    NoDatabaseList          : "Désolé, aucune liste de server de donnée est disponible",
    NoDatabaseConnected     : "Désolé, vous n'etes pas connecté a un server de donnée",
    CannotAddDatabase       : "Désolé, probleme pour ajouter une instance de server de donnée",
    CannotRemoveDatabase    : "Désolé, probleme pour enlever une instance de server de donnée",
    CannotSetDatabase       : "Désolé, probleme pour configurer une instance de server de donnée",
    CannotSaveFile          : "Désolé, sauvegarde du fichier impossible",
    NotImplemented          : "Désolé, cette fonction n'est pas encore disponible, \nVérifier si vous utilisez la dernière version d\'OPEN BEXI",
    SaveFileOK              : "Fichier correctement sauver",
    Help                    : "Aide en ligne",
    UsedLanguage            : "Le langage utilisé est le francais",
    Loading                 : "Chargement en cours ...",
    LoadingDone             : "Chargement terminé",
    noTemplate              : "Désolé, pas de template defini pour cet objet",
    SQLErrorData            : "Désolé, pas de donnée disponible\nvous n'etes pas connecté a un server SQL",
    SQLNoData               : "Désolé, pas de donnée disponible ...",
    OPENBEXIReady           : "OPEN BEXI Creative est actif\nLe langage utilisé est le francais",
    actionNotPermitted      : "Désolé, action non autorisé",
    PleaseSelectAProject    : "SVP, selectionner, créer ou suprimer un projet ...",
    PleaseSelectAWebPage    : "SVP, selectionner, créer ou suprimer une page Web...",
    PleaseSelectATemplateCategory: "SVP, selectionner, créer ou suprimer une categorie de template...",
    PleaseSelectATemplate   : "SVP, selectionner, créer ou suprimer un template...",
    ProjectAlreadyExit      : "Ce projet existe deja ...",
    ProjectCreated          :"Le projet a été créé ...",
    TemplateCreated          :"Le template a été créé ...",
    ProjectNotExist         : "Ce projet n\'existe plus ...",
    PageAlreadyExit         : "Cette page existe deja ...",
    PageAlreadySaved        : "Cette page est deja sauver ...",
    TemplateAlreadyExit     : "Ce template existe deja ...",
    CategoryTemplateNotExist: "Cette catégorie de template n\'existe plus ...",
    CannotCreateTemplateCategory: "Cette catégorie de template n'a pas été créer correctement ...",
    CannotDeleteTemplateCategory: "Cette catégorie de template n'a pas été suprimer correctement ...",
    TemplateCategoryAlreadyExist:  "Cette catégorie de template existe deja ...",
    CannotDeleteFile        :"Ce fichier n'a pas été suprimer correctement ...",
    CannotCreateProject     : "Ce projet n'a pas été créer correctement ...",
    CannotDeleteProject     : "Ce projet n'a pas été suprimer correctement ...",
    submitToCommunity       : "Envoyer ce template a la communauté ...",
    publisher               : "Publier la page WEB courante vers un site",
    NoOpenPage              : "Désolé, aucune page n'a été ouverte récemment ...",
    CannotReadPage          : "Désolé, la page n'a pu etre lu ...",
    Go_to_the_last_working_web_page : "Ouvrir la dernière page sur laquelle vous travailliez",

    Rename_button           :"Renommer ce bouton"
};

//German:

var ob_Lang_de =
{

// Inspector
//    ConfigurationHelp        : "???",
//    Webpagetool         : "???",
//    WebpageName         : "???",
//    properties          : "???",

//    SendToBack          : "???",
//    BringToFront        : "???",
//    Duplicate           : "???",
//    NumberedListLbl     : "???",
//    DlgSelectBtnDelete  : "???",
//    RemoveAllPageItems  : "???",
//    RemoveAllItems      : "???",

//    Save                : "???",
//    NewPage             : "???",
//    Preview             : "???",
//    DeleteWebPage       : "???",
//    DeletePage          : "???",
//    EnableOverflow      : "???",
//    DisableOverflow     : "???",

//    PasteText           : "???",
//    PasteWord           : "???",
//    PasteHtmlCode       : "???",

//    Page                : "???",
//    Box                 : "???",
//    Node                : "???",
//    Form                : "???",
//    Checkbox            : "???",
//    RadioButton         : "???",
//    TextField           : "???",
//    text_edit            : "???",
//    button              : "???",
//    SelectionField      : "???",
//    Clock               : "???",
//    Media               : "???",
//    Calendar            : "???",

//    EditLink            : "???",
//    InsertRow           : "???",
//    DeleteRows          : "???s",
//    InsertColumn        : "???",
//    DeleteColumns       : "???",
//    RemoveGridLine      : "???",
//    ReadXMLDatabase     : "???",
//    ReadExcelText       : "???",
//    CopyPasteTable      : "???",
//    addFunction         : "???",

    BodyEditor          : "HTML-Editor",
    ButtonEditor        : "Klickbutton-Editor",
    CheckboxEditor      : "Checkbox-Editor",
    ClockEditor         : "Taktgeber-Editor",
    DivBoxEditor        : "Box-Editor",
    FormEditor          : "Formular-Editor",
    ImageEditor         : "Bild-Editor",
    LineEditor          : "Linie-Editor",
    LinkEditor          : "Link-Editor",
    ListEditor          : "Liste-Editor",
    MediaEditor         : "Mittel-Editor",
    NodeEditor          : "Nullpunkt-Editor",
    DivPageEditor       : "Seite Netz-Editor",
    TableEditor         : "Tabelle-Editor",
    TextfieldEditor     : "Textfeld einzeilig-Editor",

//    AddEdge             : "???",
//    ClearEdge           : "C???",
//    AddTextEdge         : "???",
//    DeleteTextEdge      : "???",

//    AlignLeftAutoArrange: "???"

//    AlignRightAutoArrange       : "???",
//    AlignTopAutoArrange         : "???",
//    AlignBottomAutoArrange      : "???",
//    HorizontalSpacingAutoArrange: "???",
//    VerticalSpacingAutoArrange  : "???",
//    VerticalHeightAutoResize    : "???",
//    VerticalWidthAutoResize    : "???",
//    HorizontalHeightAutoResize  : "???",
//    HorizontalWidthAutoResize  : "???",
//    UndoAutoArrange             : "???",
//    RedoAutoArrange             : "???",

//    selectPageInsertHTML   : "???",
//    enterObjectNameFunction: "???",
//    enterObjectURL         : "???",
//    typeVerticalSpacing    : "???",
//    typeHorizontalSpacing  : "???",
//    Notconnected           : "???",
//    NotImplemented         : "???",
    Help                     : "Online-Hilfe"
}
// italian
var ob_Lang_it =
{
    BodyEditor          : "Editor web",
    Help                : "guida in linea"
}
var ob_Lang_pt =
{
    Help                : "ajuda online"
}
function openbexi_getLanguage2() {
    var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    var lang = get_xml_classe_object_attribut_value(ob_doc, "bexicontext", "language", "name");
    for (var i = 0; i < bexi_language.length; i++) {
        if (lang == bexi_language[i]) return bexi_language2[i];
    }
    return "English";
}
function openbexi_setLanguage(language) {   

    _CURRENT_OPENBEXI_LANGUAGE = language;
    var ob_doc = openbexi_get_documentElement(OPENBEXI_PRIVATE_CONTEXT_XML, "text/xml");
    set_xml_classe_object_attribut_value(ob_doc, "bexicontext", "language", "name", language);
    OPENBEXI_PRIVATE_CONTEXT_XML = openbexi_get_xmlString(ob_doc);
    // Load dynamically the OPEN OPENBEXI language table
    if (language == "es") {
        ob_Lang = ob_Lang_es;
    } else if (language == "fr") {
        ob_Lang = ob_Lang_fr;
    } else if (language == "it") {
        ob_Lang = ob_Lang_it;
    } else if (language == "de") {
        ob_Lang = ob_Lang_de;
    } else if (language == "pt") {
        ob_Lang = ob_Lang_pt;
    } else if (language == "ru") {
        ob_Lang = ob_Lang_ru;
    } else if (language == "en") {
        ob_Lang = ob_Lang_en;
    } else {
        ob_Lang = ob_Lang_en;
        //alert(openbexi_lang("NotImplemented"))
    }
}
function openbexi_lang(key) {
    var text = ob_Lang[key];
    if (text == undefined) text = ob_Lang_en[key];
    if (text == undefined) text = key;
    return text;
}

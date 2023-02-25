
//
const vscode = require('vscode')

//
const Mustache = require('mustache')

//
function activate(context) {

    //
	let disposable = vscode.commands.registerCommand('debug-this.createDebugReplacement', function() {

        //load the latest options
        const config = vscode.workspace.getConfiguration('debug-this')

        //get the active text editor
		const editor = vscode.window.activeTextEditor

        //
        if (!editor) {
            return;
        }

        //get the document, and selection within the document
        const document  = editor.document
        const selection = editor.selection
        
        //
        const options = config.get('options').filter((option) => {
            return option.language.includes(document.languageId);
        }).at(0);

        //
        if (options === undefined) {
            vscode.window.showErrorMessage(`No configuration for "${document.languageId}" found for Debug This.`)
            return
        }

        //get the content of the selection, treat each line as a new variable, and create a list of variables with an escaped and unescaped version
        const variables = document.getText(selection).replace(/\r?\n/g, '\n').split('\n').filter(line => line != '').map((line) => {
            return [options.replace.reduce((a, c) => {
                return a.replaceAll(c[0], c[1])
            }, line.trim()), line.trim()]
        })

        //
        if (variables.length == 0) {
            return
        }

        //pass the variables to mustach for rendering
        const output = Mustache.render(((variables.length == 1) ? options.single : options.multi), ((variables.length == 1) ? variables[0] : {variables}), {}, options?.delimiters ?? [ '{{', '}}' ])

        //replace the selection with the new markup
        editor.edit((editBuilder) => {
            editBuilder.replace(selection, output)
        })

	})

    //
    context.subscriptions.push(disposable);

}

//
function deactivate() {
    /* nothing to do here */
}

//
module.exports = {
	activate,
	deactivate
}

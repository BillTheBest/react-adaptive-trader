var context = require.context('./src', true, /_tests\.jsx?$/) //make sure you have your directory and regex test set correctly!
context.keys().forEach(context)

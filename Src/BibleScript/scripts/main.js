
requirejs(["test/BibleScriptTest"], function (BibleScriptTestImport)
{
    if (testRunner == null)
    {
        testRunner = new BibleScriptTestImport.BibleScript.Tests();
    }
});
Java.perform(function () {

    var Build = Java.use("android.os.Build");
    var File = Java.use("java.io.File");
    var Debug = Java.use("android.os.Debug");

    // Bypass emulator detection
    Build.PRODUCT.value = "real_device";
    Build.HARDWARE.value = "qcom";

    // Bypass test-keys check
    Build.TAGS.value = "release-keys";

    // Bypass file existence (su, Superuser.apk)
    File.exists.implementation = function () {
        var path = this.getAbsolutePath();

        if (path.includes("su") || path.includes("Superuser.apk")) {
            return false;
        }

        return this.exists();
    };

    //  Bypass debugger detection
    Debug.isDebuggerConnected.implementation = function () {
        return false;
    };

    Debug.waitingForDebugger.implementation = function () {
        return false;
    };

    console.log("[+] Root + Emulator + Debug bypass active");

});

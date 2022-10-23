#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]


/// Crate to fix the PATH environment variable on macOS and Linux when running a GUI app.
fn check_patch_fix() {
    fix_path_env::fix().unwrap();
}

fn main() {
    check_patch_fix();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

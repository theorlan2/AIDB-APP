#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
use port_scanner::local_port_available;




#[tauri::command]
fn check_is_port_run(port: u16) ->Result<bool,bool> { 
  Ok(!local_port_available(port))
}

fn main() {
  fix_path_env::fix();
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![check_is_port_run])  
  .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

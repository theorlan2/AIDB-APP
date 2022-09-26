import { open } from '@tauri-apps/api/dialog';

export async function openDialogSelectDirectory(): Promise<string | string[] | null> {

    const selected = await open({
        directory: true,
        defaultPath: '~',
    });

    return selected
}


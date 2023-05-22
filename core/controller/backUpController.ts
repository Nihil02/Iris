interface IBackUpAPI {
  createBackUp: (src: string, dest: string) => void;
}

declare global {
  interface Window {
    backUpAPI: IBackUpAPI;
  }
}

class BackUpcontroller {
  /**
   * Creates a backup and saves him in the `backups` folder.
   *
   * @param {string} src The path of database folder.
   * @param {string} dest The path of the backup folder.
   */
  static createBackUp(src: string, dest: string) {
    window.backUpAPI.createBackUp(src, dest);
  }
}

export { BackUpcontroller };

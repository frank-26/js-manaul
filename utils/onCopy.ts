export function onCopyToClipboard(text: string) {
  const newNavigator: any = window.navigator;

  if (newNavigator.clipboard) {
    return newNavigator.clipboard.writeText(text);
  } else {
    return new Promise((resolve, reject) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand('copy');
      resolve();
      document.removeChild(textarea);
    });
  }
}
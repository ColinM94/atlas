/**
 * Formats and logs error to terminal.
 *
 * @param source The name of the function where the error was thrown.
 * @param error the error you want to report
 */

type Props = {
  source: string;
  /** The actual error which was thrown */
  error: Error;
  /** Your custom description of this error */
  description?: string;
};

export const trackError = (props: Props) => {
  const { error, source, description } = props;

  let formattedError = "";

  if (error && error.name && error.message && error.stack) {
    const tempError = error;

    formattedError = `name: ${tempError.name}\nmessage: ${tempError.message}\nstack: ${tempError.stack}\n`;
  } else if (typeof error === "object") {
    JSON.stringify(error);
  } else {
    formattedError = String(error);
  }

  console.log(
    `%cError\n%cSource: ${source}\n%cDescription: ${String(
      description
    )}\n%c${formattedError}`,
    "color: red; font-weight: bold; font-size: 15px; margin-bottom: 4px;",
    "color: white; font-size: 12px; margin-bottom: 4px;",
    "color: white; font-size: 12px; margin-bottom: 4px;",
    "color: dodgerblue; font-size: 10px;"
  );
};

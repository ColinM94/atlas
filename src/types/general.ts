export type RequestResponseSuccess<T> = {
  data: T;
  success: true;
};

export type RequestResponseFail = {
  success: false;
};

export type RequestResponse<T> = Promise<
  RequestResponseSuccess<T> | RequestResponseFail
>;

export type DatabaseCollection = "notes";

export type DocumentMetadata = {
  id: string;
};

// React
export type Children = React.ReactNode | React.ReactNode[];

export type Collection = "notes" | "users" | "tasks" | "habits";

export type FormSubmitEvent = React.FormEvent<HTMLFormElement>;

export type DatabaseRecord = {
  id: string;
};

export type Layer = 0 | 1 | 2 | 3;

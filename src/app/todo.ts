export class Todo {
    id: number;
  message: string = '';
  isActive: boolean = false;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}

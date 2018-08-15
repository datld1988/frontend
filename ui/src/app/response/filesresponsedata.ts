import { Files, Operation } from './../model/works';
import { ResponeData } from './../model/responedata';
export class FilesResponeData extends  ResponeData {
    response: Files[];
}
export class FileResponeData extends  ResponeData {
    response: Files;
}

export class OperationResponeData extends  ResponeData {
    response: Operation[];
}
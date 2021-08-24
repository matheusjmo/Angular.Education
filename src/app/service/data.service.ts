import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
    sharedData: string = "";

    constructor() { }
}
import { ElementRef } from '@angular/core';
import { ModeService } from '../services/mode/mode.service';
import { UserService } from '../services/user/user.service';
import { ModeDirective } from './mode.directive';

describe('ModeDirective', () => {
    let modeServ: ModeService;
    let userServ: UserService;
    let elementRef: ElementRef;
    it('should create an instance', () => {
        const directive = new ModeDirective(modeServ, userServ, elementRef);
        expect(directive).toBeTruthy();
    });
});

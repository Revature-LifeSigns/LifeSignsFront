import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModeService } from '../services/mode/mode.service';
import { UserService } from '../services/user/user.service';
import { ModeDirective } from './mode.directive';
import { DarkTheme } from './theme/darkTheme';

describe('ModeDirective', () => {
    let modeServ: ModeService;
    let userServ: UserService;
    let elementRef: ElementRef;
    it('should create an instance', () => {
        const directive = new ModeDirective(modeServ, userServ, elementRef);
        expect(directive).toBeTruthy();
    });
});

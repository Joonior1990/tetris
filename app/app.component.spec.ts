import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameComponent } from './gameFieldComponent/game.component';
import { StartStateInterface } from './interfaces/game.start.reducer.interface';
import { START_GAME, TITLE } from './constants/index';

import { AppComponent } from './app.component';

let appComp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let title: HTMLElement;

describe('AppComponent', () => {
    beforeEach( async(() => {
        let isStarted: boolean = false;

        let StoreMock = {
            select: () => ({subscribe: () => isStarted}),
            dispatch: () => !isStarted
        };

        TestBed.configureTestingModule({
            declarations: [ AppComponent, GameComponent ], // declare the test component
            providers: [{provide: Store, useValue: StoreMock}],
            schemas:      [ NO_ERRORS_SCHEMA ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);

        appComp = fixture.componentInstance; // AppComponent test instance
        fixture.detectChanges();

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        title = de.nativeElement;
    });

    it(`should has h1 element with title "Tetris"`, () => {
        expect(title.innerHTML).toEqual(TITLE);
    });
});

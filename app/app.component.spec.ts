import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import { AppComponent } from './app.component';

let appComp: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let de: DebugElement;
let title: HTMLElement;

describe('AppComponent', () => {
    // initialize variables
    let expectTitle: string = 'Tetris';
    let newTitlelessThreeSymbols = 'un';
    let newTitlemoreThreeSymbols = 'Title';

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ], // declare the test component
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
        expect(title.innerHTML).toEqual(expectTitle);
    });

    it(`should change title if titleHandler was called with more then 3 symbols`, () => {

        appComp.titleHandler(newTitlelessThreeSymbols);
        fixture.detectChanges();

        expect(title.innerHTML).toEqual(expectTitle);

        appComp.titleHandler(newTitlemoreThreeSymbols);
        fixture.detectChanges();

        expect(title.innerHTML).toEqual(newTitlemoreThreeSymbols);
    });

    it(`should change title if inputPressHandler was called with more then 3 symbols`, () => {
        appComp.inputPressHandler({charCode: 13}, newTitlelessThreeSymbols);
        fixture.detectChanges();

        expect(title.innerHTML).toEqual(expectTitle);

        appComp.inputPressHandler({charCode: 13}, newTitlemoreThreeSymbols);
        fixture.detectChanges();

        expect(title.innerHTML).toEqual(newTitlemoreThreeSymbols);
    });
});

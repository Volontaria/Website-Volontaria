import {
  ContentChildren,
  Component,
  QueryList,
  Input,
  forwardRef,
  AfterContentInit,
  OnDestroy,
  Output, EventEmitter, ContentChild, ElementRef, Host, Inject, ChangeDetectorRef, HostListener
} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: "accordion",
    styleUrls: ['./my-accordion.component.scss'],
    template: `
<div class="panel-group" role="tablist" aria-multiselectable="true">
    <ng-content></ng-content>
</div>
`
})
export class Accordion implements AfterContentInit, OnDestroy {

    @Input()
    closeOthers = true;

    @Input()
    showArrows = false;

    @Input()
    expandAll = false;

    @ContentChildren(forwardRef(() => AccordionGroup))
    groups: QueryList<AccordionGroup>;

    /**
     * We need to save old groups to make difference and find newly changed group, to toggle them.
     */
    private oldGroups: AccordionGroup[];

    private subscription: Subscription;

    ngAfterContentInit() {
        if (this.expandAll) {
            this.closeOthers = false;
            this.oldGroups = this.groups.toArray();
            this.oldGroups.forEach(group => {
                group.openOnInitialization();
            });

            // we subscribe for changes, and if new groups are added we open them automatically
            this.subscription = this.groups.changes.subscribe(change => {
                const newGroups = this.groups.toArray().filter(group => {
                    return this.oldGroups.indexOf(group) === -1;
                });
                newGroups.forEach(group => {
                    group.openOnInitialization();
                });
                this.oldGroups = this.groups.toArray();
            });
        }
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    closeAll() {
        this.groups.toArray().forEach(group => {
            group.isOpened = false;
        });
    }

}

@Component({
    selector: "accordion-toggle",
    template: `<ng-content></ng-content>`
})
export class AccordionToggle {

    constructor(@Host() @Inject(forwardRef(() => AccordionGroup)) private accordionGroup: AccordionGroup) {
    }

    @HostListener("click")
    onClick() {
        this.accordionGroup.toggle();
    }
}


@Component({
    selector: "accordion-group",
    styleUrls: ['./my-accordion.component.scss'],
    template: `
  <div class="panel panel-default" [class.dropup]="isOpened" [class.disabled]="disabled">
    <div class="panel-heading" role="tab" (click)="checkAndToggle()">
      <h3 class="panel-title">
        <a *ngIf="heading" role="button" data-toggle="collapse" [attr.aria-expanded]="isOpened">
            {{ heading }}<span class="my-caret {{isOpened}}" [style.display]="accordion.showArrows ? '' : 'none'"></span>
        </a>
        <ng-content select="accordion-heading"></ng-content>
      </h3>
    </div>
    <div *ngIf="isOpened" class="panel-collapse collapse in" role="tabpanel" [attr.aria-labelledby]="heading">
      <div class="panel-body">
        <ng-content></ng-content>
      </div>
    </div>
  </div>
`
})
export class AccordionGroup {

    @Input()
    heading: string;

    @Input()
    isOpened: boolean = false;

    @Output()
    onOpen = new EventEmitter();

    @Output()
    onClose = new EventEmitter();

    @Output()
    onToggle = new EventEmitter();

    @ContentChild(AccordionToggle)
    toggler: ElementRef;

    @Input()
    disabled: boolean = false;

    constructor(@Host() @Inject(forwardRef(() => Accordion)) public accordion: Accordion,
                private cdr: ChangeDetectorRef) {
    }

    checkAndToggle() {
        // if custom toggle element is supplied, then do nothing, custom toggler will take care of it
        if (this.toggler)
            return;

        this.toggle();
    }

    toggle() {
        if (this.disabled)
            return;

        const isOpenedBeforeWeChange = this.isOpened;
        if (this.accordion.closeOthers)
            this.accordion.closeAll();

        this.isOpened = !isOpenedBeforeWeChange;
        if (this.isOpened) {
            this.onOpen.emit();
        } else {
            this.onClose.emit();
        }
        this.onToggle.emit(this.isOpened);
    }

    openOnInitialization() {
        this.isOpened = true;
        this.cdr.detectChanges();
    }

}

@Component({
    selector: "accordion-heading",
    template: `<ng-content></ng-content>`
})
export class AccordionHeading {

}




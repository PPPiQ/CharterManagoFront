import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DialogContentDirective } from '../dialog-content.directive';
import { DialogHeaderDirective } from '../dialog-header.directive';
import { DialogFooterDirective } from '../dialog-footer.directive';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: '[appDialog]',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @ContentChild(DialogContentDirective)
  content!: DialogContentDirective;
  @ContentChild(DialogHeaderDirective)
  header!: DialogHeaderDirective;
  @ContentChild(DialogFooterDirective)
  footer!: DialogFooterDirective;

  @ViewChild('contentContainer', { read: ViewContainerRef, static: true })
  private contentContainer: ViewContainerRef | undefined;

  @ViewChild('headerContainer', { read: ViewContainerRef, static: true })
  private headerContainer: ViewContainerRef | undefined;

  @ViewChild('footerContainer', { read: ViewContainerRef, static: true })
  private footerContainer: ViewContainerRef | undefined;

  @Input() title: string = 'Dialog: ';

  @HostListener('cancel')
  onDialogCancel() {
    this.clear();
  }

  @HostListener('click', ['$event'])
  onDialogClick(event: MouseEvent) {
    const target = event?.target as Node; 
    if (target?.nodeName === 'DIALOG') {
      this.close();
    }
  }

  constructor(private host: ElementRef) {}

  showModal() {
    this.host.nativeElement.showModal();
    this.contentContainer &&
      this.contentContainer.createEmbeddedView(this.content.tpl);
    this.header?.tpl &&
      this.headerContainer &&
      this.headerContainer.createEmbeddedView(this.header.tpl);
    this.footer?.tpl &&
      this.footerContainer &&
      this.footerContainer.createEmbeddedView(this.footer.tpl);
  }

  close() {
    this.element.close();
    this.clear();
  }

  private clear() {
    this.contentContainer && this.contentContainer.clear();
    this.footerContainer && this.footerContainer.clear();
    this.headerContainer && this.headerContainer.clear();
  }

  private get element() {
    return this.host.nativeElement;
  }
}

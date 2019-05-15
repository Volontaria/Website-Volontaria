import {Component, ViewEncapsulation} from '@angular/core';
import {InfoPageService} from "../../../services/info.service";
import {InfoSection} from "../../../models/info";
import {AccordionModule} from "../../my-accordion/";

@Component({
  templateUrl: 'info-page.component.html',
  selector: 'app-info',
  styleUrls: ['info-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoPageComponent {

  constructor(private infoPageService: InfoPageService) {

  }

  sections: InfoSection[];

  ngOnInit() {
    this.infoPageService.getInfos().subscribe(
      data => {
        this.sections = data.results.map(c => new InfoSection(c));
      }
    );
  }
}

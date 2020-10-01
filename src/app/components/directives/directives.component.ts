import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.sass'],
})
export class DirectivesComponent implements OnInit {
  courses;
  courses2 = [1, 2, 3];
  viewMode = 'somethingElse';
  isSelected = true;
  constructor() {}
  cambiarCourses() {
    if (this.courses2.length === 0) { this.courses2 = [1, 2, 3]; }
    else { this.courses2 = []; }
    console.log(this.courses2);
  }

  loadList() {
    this.courses = [
      { id: 1, name: 'A', location: { city: 'medellin' } },
      { id: 2, name: 'B', location: { city: 'medellin' } },
      { id: 2, name: 'C', location: { city: 'medellin' } },
    ];
  }

  trackCourse(index, item) {
    return item ? item.id : undefined;
  }
  ngOnInit(): void {}
}

import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { COURSES } from '../../../../server/db-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { Course } from '../model/course';
import { setupCourses } from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement; // To query DOM

  beforeEach(waitForAsync(() => {

    // Setting testing environment
    TestBed.configureTestingModule({
      imports: [CoursesModule] // To get all the components used in <CoursesCardListComponent>
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement; // To query DOM
      });

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display the course list", () => {

    /*
    1. Some DOM interaction is needed to confirm if the list appears on the screen or not
    2. Going to fire change detection mechanism of angular manually to make sure that view reflects the latest data
    3. We will also learn how to debug such a component test
    */

    // pass some data to the component to show
    component.courses = setupCourses();

    /*
      Courses were not getting populated in the DOM because change detection was not getting fired.
      ***So we did it manually***.
      No need to use waitForAsync() or any other async methods.
    */
    fixture.detectChanges(); // Fires up change detection mechanism

    // console.log(el.nativeElement.outerHTML); // Debugging step 1

    // Next we will make sure that data is getting displayed in the component by querying and asserting that the data is there
    const cards = el.queryAll(By.css('.course-card'));// Querying DOM to find if the .course-card exists or not

    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(12, "Unexpected number of courses"); // This will fail

  });


  it("should display the first course", () => {

    component.courses = setupCourses();

    fixture.detectChanges();

    const course = component.courses[0];

    const card = el.query(By.css('.course-card:first-child')),
      title = el.query(By.css('.mat-mdc-card-title')),
      image = el.query(By.css('img'));

    expect(card).toBeTruthy("Could not find course card");

    expect(title.nativeElement.textContent).toBe(course.titles.description);

    expect(image.nativeElement.src).toBe(course.iconUrl);

  });


});

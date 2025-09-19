// CourseController.js
import CourseModel from "./CourseModel.js";
import CourseView  from "./CourseView.js";

export default class CourseController {
  constructor() {
    this.model = new CourseModel();
    this.view  = new CourseView();
    this.init();
  }

  async init() {
    await this.model.fetchCourses();
    this.view.renderCourses(this.model.courses, this.model.selectedCourses);
    this.view.updateCredit(this.model.totalCredit);

    this.view.bindCourseClick(this.onToggle);
    this.view.bindSelectedClick(this.onToggle);
    this.view.bindSelect(this.onConfirm);
  }

  onToggle = (id) => {
    const cid = String(id);
    const course = this.model.courses.find((c) => c.id === cid);
    if (!course) return;

    if (this.model.toggleCourse(course)) {
      this.view.renderCourses(this.model.courses, this.model.selectedCourses);
      this.view.updateCredit(this.model.totalCredit);
    }
  };

  onConfirm = () => {
    const total = this.model.totalCredit;
    const msg =
      `You have chosen ${total} credits for this semester. ` +
      `You cannot change once you submit. Do you want to confirm?`;
    if (confirm(msg)) {
      this.view.setSelectDisabled(true);
      alert("Courses confirmed!");
    }
  };
}

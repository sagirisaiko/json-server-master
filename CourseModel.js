// CourseModel.js
const FETCH_URL = "http://localhost:4232/courseList"; 

export default class CourseModel {
  constructor() {
    this.courses = [];
    this.selectedCourses = [];
    this.totalCredit = 0;
    this.MAX_CREDIT = 18;
  }

  async fetchCourses() {
    try {
      const res = await fetch(FETCH_URL, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const raw = await res.json();

      const arr = Array.isArray(raw) ? raw : (raw.courseList ?? []);
      this.courses = arr.map((c) => {
        const cid = (c.courseId ?? c.id);
        return {
          id: String(cid),
          name: c.name ?? c.courseName,
          type: c.type ?? (c.required ? "Compulsory" : "Elective"),
          credit: Number(c.credit ?? 0),
        };
      });

      return this.courses;
    } catch (err) {
      console.error("fetchCourses failed:", err);
      alert("Error");
      this.courses = [];
      return this.courses;
    }
  }

  toggleCourse(course) {
    const idx = this.selectedCourses.findIndex((x) => x.id === course.id);

    if (idx >= 0) {
      this.totalCredit -= this.selectedCourses[idx].credit;
      this.selectedCourses.splice(idx, 1);
      return true;
    }

    if (this.totalCredit + course.credit > this.MAX_CREDIT) {
      alert("You can only choose up to 18 credits in one semester");
      return false;
    }

    this.selectedCourses.push(course);
    this.totalCredit += course.credit;
    return true;
  }
}

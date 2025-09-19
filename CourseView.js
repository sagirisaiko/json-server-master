// CourseView.js
export default class CourseView {
    constructor() {
      this.courseList    = document.getElementById("course-list");
      this.selectedList  = document.getElementById("selected-list");
      this.totalCreditEl = document.getElementById("total-credit");
      this.selectBtn     = document.getElementById("select-btn");
    }
  
    renderCourses(courses, selected) {
      this.courseList.innerHTML = "";
      courses.forEach((course) => {
        const div = document.createElement("div");
        div.className = "course";
        div.dataset.id = course.id;
        div.innerHTML = `
          <div class="title">${course.name}</div>
          <div>Course Type : ${course.type}</div>
          <div>Course Credit : ${course.credit}</div>
        `;
        if (selected.some((s) => s.id === course.id)) div.classList.add("selected");
        this.courseList.appendChild(div);
      });
  
      this.selectedList.innerHTML = "";
      selected.forEach((course) => {
        const div = document.createElement("div");
        div.className = "course";
        div.dataset.id = course.id;
        div.innerHTML = `
          <div class="title">${course.name}</div>
          <div>Course Type : ${course.type}</div>
          <div>Course Credit : ${course.credit}</div>
        `;
        this.selectedList.appendChild(div);
      });
    }
  
    updateCredit(total) {
      this.totalCreditEl.textContent = total;
    }
  
    bindCourseClick(handler) {
      this.courseList.addEventListener("click", (e) => {
        const item = e.target.closest(".course");
        if (item) handler(item.dataset.id);
      });
    }
  
    bindSelectedClick(handler) {
      this.selectedList.addEventListener("click", (e) => {
        const item = e.target.closest(".course");
        if (item) handler(item.dataset.id);
      });
    }
  
    bindSelect(handler) {
      this.selectBtn.addEventListener("click", handler);
    }
  
    setSelectDisabled(disabled) {
      this.selectBtn.disabled = disabled;
    }
  }
  
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../core/services/student.service';

interface Student {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-students',
  imports: [FormsModule],
  templateUrl: './students.component.html',
})
export class StudentsComponent {
  students: Student[] = [];
  selectedStudent: Student | null = null;
  isEditModalOpen = false;
  newStudent = { name: '', email: '' };
  isAddModalOpen = false;

  showToast: boolean = false;
  toastMessage: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  private toastTimeout: any;

  showMessage(message: string): void {
    this.toastMessage = message;
    this.showToast = true;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students: Student[]) => {
        this.students = students;
      },
      error: (error: any) => {
        console.error('Error fetching students', error);
        this.showMessage(error.error?.message || 'Failed to fetch students.');
      }
    });
  }

  addStudent(): void {
    const newStudent: Omit<Student, 'id'> = {
      name: this.newStudent.name,
      email: this.newStudent.email
    };

    this.studentService.createStudent(newStudent as Student).subscribe({
      next: (student: Student) => {
        this.students.push(student);
        this.isAddModalOpen = false;
        this.newStudent = { name: '', email: '' };
        this.showMessage('Student added successfully!');
      },
      error: (error: any) => {
        console.error('Error adding student', error);
        this.showMessage(error.error?.message || 'Failed to add student.');
      }
    });
  }

  saveStudent(): void {
    if (this.selectedStudent) {
      this.studentService.updateStudent(this.selectedStudent.id, this.selectedStudent).subscribe({
        next: (updatedStudent: Student) => {
          const index = this.students.findIndex(s => s.id === updatedStudent.id);
          if (index !== -1) {
            this.students[index] = updatedStudent;
          }
          this.isEditModalOpen = false;
          this.showMessage('Student updated successfully!');
        },
        error: (error: any) => {
          console.error('Error updating student', error);
          this.showMessage(error.error?.message || 'Failed to update student.');
        }
      });
    }
  }

  deleteStudent(id: string): void {
    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.students = this.students.filter(student => student.id !== id);
        this.showMessage('Student deleted successfully!');
      },
      error: (error: any) => {
        console.error('Error deleting student', error);
        this.showMessage(error.error?.message || 'Failed to delete student.');
      }
    });
  }

  openEditModal(student: Student): void {
    this.selectedStudent = { ...student };
    this.isEditModalOpen = true;
  }

  openAddModal(): void {
    this.newStudent = { name: '', email: '' };
    this.isAddModalOpen = true;
  }

  viewAddress(studentId: string): void {
    this.router.navigate(['/address', studentId]);
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface Student {
  id: string;
  name: string;
  email: string;
}

interface Address {
  id: string;
  address: string;
}

@Component({
  selector: 'app-students',
  imports: [FormsModule],
  templateUrl: './students.component.html',
})
export class StudentsComponent {
  students: Student[] = [
    { id: '8a4f12e3-1a7d-4b3e-9f2c-5d6b7e8f9a0b', name: 'Olivia Rodriguez', email: 'olivia.rodriguez@example.com' },
    { id: 'b5c9d8e7-f6a5-4b3c-2d1e-0f9a8b7c6d5e', name: 'Noah Garcia', email: 'noah.garcia@example.com' },
    { id: '3e4d5c6b-7a8b-9c0d-1e2f-3a4b5c6d7e8f', name: 'Ava Miller', email: 'ava.miller@example.com' },
    { id: '9d8c7b6a-5f4e-3d2c-1b0a-9e8d7c6b5a4f', name: 'William Davis', email: 'william.davis@example.com' },
    { id: '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', name: 'Sophia Martinez', email: 'sophia.martinez@example.com' },
    { id: '6e5d4c3b-2a1f-9e8d-7c6b-5a4f3e2d1c0b', name: 'James Smith', email: 'james.smith@example.com' },
    { id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', name: 'Isabella Johnson', email: 'isabella.johnson@example.com' },
    { id: '7f8e9d0c-1b2a-3c4d-5e6f-7a8b9c0d1e2f', name: 'Oliver Williams', email: 'oliver.williams@example.com' },
    { id: '4d3c2b1a-0e9f-8d7c-6b5a-4f3e2d1c0b9a', name: 'Emma Brown', email: 'emma.brown@example.com' },
    { id: '0b9a8f7e-6d5c-4b3a-2d1f-0e9d8c7b6a5f', name: 'Liam Jones', email: 'liam.jones@example.com' },
    { id: '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', name: 'Olivia Garcia', email: 'olivia.garcia@example.com' },
    { id: '3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d', name: 'Noah Miller', email: 'noah.miller@example.com' },
    { id: '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', name: 'Ava Davis', email: 'ava.davis@example.com' },
    { id: '2d3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7a', name: 'William Martinez', email: 'william.martinez@example.com' },
    { id: '8e9f0a1b-2c3d-4e5f-6a7b-8c9d0e1f2a3b', name: 'Sophia Smith', email: 'sophia.smith@example.com' },
    { id: '4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b', name: 'James Johnson', email: 'james.johnson@example.com' },
    { id: '0a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c5d', name: 'Isabella Williams', email: 'isabella.williams@example.com' },
    { id: '6b7c8d9e-0f1a-2b3c-4d5e-6f7a8b9c0d1e', name: 'Oliver Brown', email: 'oliver.brown@example.com' },
    { id: '2c3d4e5f-6a7b-8c9d-0e1f-2a3b4c5d6e7f', name: 'Emma Jones', email: 'emma.jones@example.com' },
    { id: '8d9e0f1a-2b3c-4d5e-6f7a-8b9c0d1e2f3a', name: 'Liam Rodriguez', email: 'liam.rodriguez@example.com' }
  ];

  selectedStudent: Student | null = null;
  isEditModalOpen = false;

  newStudent = { name: '', email: '' };
  isAddModalOpen = false;

  showAddressModal = false;


  loginData = { username: '', password: '' };

  openEditModal(student: Student): void {
    this.selectedStudent = { ...student };
    this.isEditModalOpen = true;
  }

  saveStudent(): void {
    if (this.selectedStudent) {
      const index = this.students.findIndex(s => s.id === this.selectedStudent!.id);
      if (index !== -1) {
        this.students[index] = { ...this.selectedStudent };
      }
      this.isEditModalOpen = false;
    }
  }

  deleteStudent(id: string): void {
    this.students = this.students.filter(student => student.id !== id);
  }

  openAddModal(): void {
    this.newStudent = { name: '', email: '' };
    this.isAddModalOpen = true;
  }

  addStudent(): void {
    this.students.push({
      id: self.crypto.randomUUID(),
      ...this.newStudent
    });

    this.isAddModalOpen = false;

  }

  constructor(private router: Router) { }

  viewAddress(studentId: string) {
    this.router.navigate(['/address', studentId]);
  }
}

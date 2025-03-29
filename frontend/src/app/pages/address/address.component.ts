import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styles: ``
})
export class AddressComponent implements OnInit {
  studentId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  studentAddress = "Address of student: ";

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');

    this.studentAddress = this.studentAddress + this.studentId;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../../core/services/address.service';

interface Address {
  id: string;
  address: string;
}

@Component({
  selector: 'app-address',
  imports: [],
  templateUrl: './address.component.html',
  styles: ``
})
export class AddressComponent implements OnInit {
  studentId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
  ) { }

  studentAddress: string = "";

  showToast: boolean = false;
  toastMessage: string = '';

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.getAddress(this.studentId ?? "");
  }

  getAddress(id: string): void {
    this.addressService.getAddress(id).subscribe({
      next: (address: Address) => {
        this.studentAddress = address.address;
      },
      error: (error: any) => {
        console.error('Error fetching students', error);
        this.showMessage(error.error?.message || 'Failed to fetch students.');
      }
    });
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
}

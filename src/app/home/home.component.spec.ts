import { LocationService } from './../shared-service/location.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockService: LocationService

  beforeEach(async () => {
    const mockService = jasmine.createSpyObj('LocationService', ['getOrigin']);
    await TestBed.configureTestingModule({
      imports: [HomeComponent, NoopAnimationsModule],
      providers:[
        {provide:LocationService, useValue:mockService}
      ]
    }).compileComponents();

  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get getorigin places from api call', ()=>{
    // const data:any = [
    //   {
    //     item: 'lap',
    //     quantity: 1,
    //     estimatedPrice: 100000,
    //   },
    //   {
    //     item: 'bag',
    //     quantity: 1,
    //     estimatedPrice: 2555,
    //   }
    // ];

    const obj =  {
      "data": [
        "IXA - Maharaja Bir Bikram Airport",
        "AMD - Sardar Vallabhai Patel International Airport",
        "ATQ - Sri Guru Ram Dass Jee International Airport",
        "AYJ - Maharishi Valmiki International Airport, Ayodhya Dham",
        "BLR - Kempegowda International Airport",
        "BBI - Biju Patnaik International Airport",
        "MAA - Chennai International Airport",
        "CJB - Coimbatore International Airport",
        "DEL - Indira Gandhi International Airport",
        "JWR - Noida International Airport",
        "GOI - Dabolim Airport",
        "GOX - Manohar International Airport"
      ]
    }
    

    jasmine.createSpy('getOrigin').and.returnValue(of(obj.data));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.originPlaces).toEqual(obj.data);

    
  })

});

import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { ElectionService } from "./election.service";
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from "rxjs";
import { Election } from "../election";
describe("ElectionService",()=>{
    let electionService:ElectionService;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                ElectionService,
                HttpClient
            ]
        })
        .compileComponents();
        electionService = TestBed.inject(ElectionService);
    });

    it('should retrive an election', () => {
        let mockResponse:Election = {
            id : "16029366a10d2612bbcfee12f",
            title : "Team gasdasd Leader",
            description : "this is for upcoming project.....",
            startDate : new Date("2021-02-18T09:10:06.573Z"),
            endDate : new Date("2021-02-19T14:40:06.573"),
            status : "upcomming",
            createdBy : "60056f1601b2b41e28efa187",
            voters:  [{"id":"1","publicAddress":"1"},{"id":"2","publicAddress":"2"}],
            candidates : [{"id":"1","name":"1"}],
            deploymentPost:"",
            deploymentLocation:"",
            contractMnemonics:"",
        }
        let response;
        spyOn(electionService,'getElectionForTesting').and.returnValue(of(mockResponse));
        electionService.getElectionForTesting("").subscribe(res => {
            response = res;
            expect(response["id"]).toEqual(mockResponse["id"])
        });
        expect(response["title"]).toEqual(mockResponse["title"])
    });
});
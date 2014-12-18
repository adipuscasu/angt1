'use strict';

(function() {
	// Firme Controller Spec
	describe('FirmeController', function() {
		// Initialize global variables
		var FirmeController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Firme controller.
			FirmeController = $controller('FirmeController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one firma object fetched from XHR', inject(function(Firme) {
			// Create sample firma using the Firme service
			var sampleFirma = new Firme({
				title: 'Firma de test',
				content: 'MEAN rocks!'
			});

			// Create a sample firme array that includes the new firma
			var sampleFirme = [sampleFirma];

			// Set GET response
			$httpBackend.expectGET('firme').respond(sampleFirme);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.firme).toEqualData(sampleFirme);
		}));

		it('$scope.findOne() should create an array with one firma object fetched from XHR using a firmaId URL parameter', inject(function(Firme) {
			// Define a sample firma object
			var sampleFirma = new Firme({
				title: 'An Firma about MEAN',
				content: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.firmaId = '525a8422f6d0f87f0e407a45';

			// Set GET response
			$httpBackend.expectGET(/firme\/([0-9a-fA-F]{24})$/).respond(sampleFirma);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.firma).toEqualData(sampleFirma);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Firme) {
			// Create a sample firma object
			var sampleFirmaPostData = new Firme({
				title: 'A Firma about MEAN',
				content: 'MEAN rocks!'
			});

			// Create a sample firma response
			var sampleFirmaResponse = new Firme({
				_id: '525cf20451979dea2c000023',
				title: 'A Firma about MEAN',
				content: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.title = 'An Firma about MEAN';
			scope.content = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('firme', sampleFirmaPostData).respond(sampleFirmaResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the firma was created
			expect($location.path()).toBe('/firme/' + sampleFirmaResponse._id);
		}));

		it('$scope.update() should update a valid firma', inject(function(Firme) {
			// Define a sample firma put data
			var sampleFirmaPutData = new Firme({
				_id: '525cf20451979dea2c000001',
				title: 'An Firma about MEAN',
				content: 'MEAN Rocks!'
			});

			// Mock firma in scope
			scope.firma = sampleFirmaPutData;

			// Set PUT response
			$httpBackend.expectPUT(/firme\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/firme/' + sampleFirmaPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid firmaId and remove the firma from the scope', inject(function(Firme) {
			// Create new firma object
			var sampleFirma = new Firme({
				_id: '525a8422f6d0f87f0e407a65'
			});

			// Create new firme array and include the firma
			scope.firme = [sampleFirma];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/firme\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleFirma);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.firme.length).toBe(0);
		}));
	});
}());
-- Clear existing data
DELETE FROM EmergencyContact;
DELETE FROM Allergy;
DELETE FROM MedicalHistory;
DELETE FROM Address;
DELETE FROM Patient;

-- Insert demo patients
INSERT INTO Patient (id, firstName, lastName, dateOfBirth, gender, email, phone, bloodGroup, notes, createdAt, updatedAt)
VALUES 
  ('pat_001', 'John', 'Doe', '1985-03-15', 'male', 'john.doe@example.com', '555-0101', 'O+', 'Regular check-up patient', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('pat_002', 'Sarah', 'Johnson', '1990-07-22', 'female', 'sarah.j@example.com', '555-0102', 'A+', 'Pregnancy follow-up', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('pat_003', 'Robert', 'Smith', '1975-11-30', 'male', 'robert.smith@example.com', '555-0103', 'B-', 'Heart condition monitoring', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('pat_004', 'Emily', 'Brown', '1995-04-18', 'female', 'emily.b@example.com', '555-0104', 'AB+', 'Asthma patient', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert addresses
INSERT INTO Address (id, street, city, state, zipCode, patientId)
VALUES 
  ('addr_001', '123 Main St', 'Springfield', 'IL', '62701', 'pat_001'),
  ('addr_002', '456 Oak Ave', 'Springfield', 'IL', '62702', 'pat_002'),
  ('addr_003', '789 Pine St', 'Springfield', 'IL', '62703', 'pat_003'),
  ('addr_004', '321 Elm St', 'Springfield', 'IL', '62704', 'pat_004');

-- Insert medical history
INSERT INTO MedicalHistory (id, condition, diagnosis, year, patientId)
VALUES 
  ('mh_001', 'Hypertension', 'Stage 1', '2020', 'pat_001'),
  ('mh_002', 'Diabetes', 'Type 2', '2019', 'pat_001'),
  ('mh_003', 'Asthma', 'Mild persistent', '2018', 'pat_002'),
  ('mh_004', 'Coronary Artery Disease', 'Stable', '2021', 'pat_003'),
  ('mh_005', 'High Cholesterol', 'Under medication', '2020', 'pat_003'),
  ('mh_006', 'Asthma', 'Moderate persistent', '2015', 'pat_004');

-- Insert allergies
INSERT INTO Allergy (id, name, patientId)
VALUES 
  ('alg_001', 'Penicillin', 'pat_001'),
  ('alg_002', 'Peanuts', 'pat_001'),
  ('alg_003', 'Dust', 'pat_002'),
  ('alg_004', 'Pollen', 'pat_002'),
  ('alg_005', 'Shellfish', 'pat_003'),
  ('alg_006', 'Latex', 'pat_004');

-- Insert emergency contacts
INSERT INTO EmergencyContact (id, name, relationship, phone, patientId)
VALUES 
  ('ec_001', 'Jane Doe', 'Spouse', '555-0201', 'pat_001'),
  ('ec_002', 'Mike Johnson', 'Brother', '555-0202', 'pat_002'),
  ('ec_003', 'Mary Smith', 'Wife', '555-0203', 'pat_003'),
  ('ec_004', 'James Brown', 'Father', '555-0204', 'pat_004'); 
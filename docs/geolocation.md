# Validating Employee Location

Managing geolocation for employees when they clock-in/clock-out so that supervisors can validate employee attendance at different work sites.

---
## Caching User Location Locally

### Problem

Initial load time is too long because it waits for user location data to be loaded at least once.

### Proposal

Store geolocation data locally alongside a `updatedAt` timestamp, which can be used to decide whether to refetch and update that data.

Currently, when an employee clocks in or clocks out, we refetch their location immediately to ensure that the information is accurate. We should not have to wait for the initial location data to load the entire app.

#### [OPTION 1] Refresh cached location data if more than X amount of time has passed

When an employee makes a time entry, we can check if there is any cached location data, and if there is none, we can fetch it and store it locally and remotely. If there IS cached location data, check the `updatedAt` timestamp and refresh the cached data if it is more than X minutes old.

#### [OPTION 2] Require that time entries to be at least 15 minutes apart

By requiring a minimum gap between time entries, we don't have to check and refresh the cached location data if it is more than X minutes old. Since we have a minimum gap between time entries, we can assume that the locally stored data is at least 15 minutes old and refresh the cache every time a time entry is made.

**Should we still store the location data with an `updatedAt` timestamp?
**

Yes, we should continue storing `updatedAt` timestamps for the cached location data, because in the future we want to allow admins/supervisors to be able to check the location of employees through out the day asynchronously.

### Solution
We are currently going with [OPTION 2] for our implementation.
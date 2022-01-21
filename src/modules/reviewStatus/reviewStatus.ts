export enum ReviewStatus {
  IN_PROGRESS = 'in-progress',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  CHANGE_REQUESTED = 'change-requested',
}

export const ReviewStatusLabel = {
  [ReviewStatus.IN_PROGRESS]: 'In progress',
  [ReviewStatus.SUBMITTED]: 'Submitted',
  [ReviewStatus.APPROVED]: 'Approved',
  [ReviewStatus.CHANGE_REQUESTED]: 'Change requested',
}

export const ReviewStatusColor = {
  [ReviewStatus.IN_PROGRESS]: 'gray',
  [ReviewStatus.SUBMITTED]: 'blue',
  [ReviewStatus.APPROVED]: 'green',
  [ReviewStatus.CHANGE_REQUESTED]: 'orange',
}

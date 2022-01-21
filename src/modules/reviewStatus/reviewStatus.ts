export enum ReviewStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  CHANGE_REQUESTED = 'change-requested',
}

export const ReviewStatusLabel = {
  [ReviewStatus.PENDING]: 'Pending',
  [ReviewStatus.APPROVED]: 'Approved',
  [ReviewStatus.CHANGE_REQUESTED]: 'Change requested',
}

export const ReviewStatusColor = {
  [ReviewStatus.PENDING]: 'gray',
  [ReviewStatus.APPROVED]: 'green',
  [ReviewStatus.CHANGE_REQUESTED]: 'orange',
}

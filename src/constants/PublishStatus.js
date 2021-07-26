export const PublishStatus = {
    NONE: 'None',
    UNPUBLISHED: 'UnPublished',
    PUBLISHED: 'Published'
}
export function MapPublishStatus(status) {
    switch (status) {
        case PublishStatus.NONE:
            return {
                variant: 'secondary',
                text: 'Không'
            }
        case PublishStatus.UNPUBLISHED:
            return {
                variant: 'success',
                text: 'Không công khai'
            }
        case PublishStatus.PUBLISHED:
            return {
                variant: 'primary',
                text: 'Công khai'
            }
    }
}
export function MapPublishStatusToBool(status) {
    switch (status) {
        case PublishStatus.NONE:
            return false;
        case PublishStatus.UNPUBLISHED:
            return false;
        case PublishStatus.PUBLISHED:
            return true;
    }
}
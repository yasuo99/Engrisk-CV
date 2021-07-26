export const QuestionStatus = {
    NONE: 'None',
    FREE: 'Free',
    IN_USE: 'InUse'
}
export default function MapQuestionStatus(status){
    switch(status){
        case QuestionStatus.NONE:
            return 'Không';
        case QuestionStatus.FREE:
            return 'Chưa sử dụng'
        case QuestionStatus.IN_USE:
            return 'Đang sử dụng'
    }
}
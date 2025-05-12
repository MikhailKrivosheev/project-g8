export default function setDefaultValues(object: {
  room_id?: string;
  tag_ids?: string[];
}) {
  return {
    room_id: object?.room_id || '',
    tag_ids: object?.tag_ids?.length ? object?.tag_ids : [],
  };
}

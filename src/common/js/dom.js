export function addClass(obj, cls){
    var obj_class = obj.className,
        blank = (obj_class != '') ? ' ' : '';
    added = obj_class + blank + cls;
    obj.className = added;
}
export function removeClass(obj, cls){
    var obj_class = ' '+obj.className+' ';
    obj_class = obj_class.replace(/(\s+)/gi, ' '),
    removed = obj_class.replace(' '+cls+' ', ' ');
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
}
export function hasClass(obj, cls){
    var obj_class = obj.className,
        obj_class_lst = obj_class.split(/\s+/);
    x = 0;
    for(x in obj_class_lst) {
        if(obj_class_lst[x] == cls) {
            return true;
        }
    }
    return false;
}
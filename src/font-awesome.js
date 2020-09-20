import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes, faSync, faUserLock } from '@fortawesome/free-solid-svg-icons';

export default function () {
    library.add(faTimes, faSync, faUserLock);
}

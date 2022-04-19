import { Router } from 'express';
import * as pincController from 'src/controllers/pinc';
import validate from 'src/middlewares/validate';
import respond from 'src/middlewares/respond';
import * as validators from './validators';

// You can set login requirements on an API endpoint by putting `requireAuth` after the URL specification
export default function mountPinc(router: Router) {

    router.get(
        '/get-yard',
        validate(validators.getYard),
        respond((req: any) => pincController.getPinc(req.query))
    );
}

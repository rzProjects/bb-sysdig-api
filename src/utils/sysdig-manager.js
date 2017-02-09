import $ from 'jquery';
import Rx from 'rxjs/Rx';

const kEnvUrl = 'https://app-staging.sysdigcloud.com/api',
	kToken = '8aef9517-3070-4090-b55e-83296cee8cd1',
	kEndpoints = {
		events: 'events'
	},
	kRefreshInterval = 30000;

class SysdigApi {
	static getEvents() {
		let deferred = $.Deferred(),
			settings = {
				url: `${kEnvUrl}/${kEndpoints.events}`,
				headers: {
					Authorization: `Bearer ${kToken}`
				}
			}

		$.ajax(settings)
			.done(res => {
				deferred.resolve(res);
			})
			.fail(res => {
				deferred.reject(res);
			});	

		return deferred.promise();
	}
};

class SysdigManager {
	constructor() {
		this.eventsReceived = new Rx.Subject();
		// there was no 'modifiedOn' in the api response.
		this.fields = {
			row: 'row',
			id: 'id',
			version: 'version',
			createdOn: 'createdOn',
			name: 'name',
			description: 'description',
			severity: 'severity',
			timestamp: 'timestamp',
			tags: 'tags'
		};
	}

	getList() {
		SysdigApi.getEvents().done(res => {
			this.eventsReceived.next(res.events);
			if (this.refreshTimer)
				clearInterval(this.refreshTimer);
			this.refreshTimer = setInterval(() => this.getList(), kRefreshInterval);
		});
	}
};

export default SysdigManager;
function bucket() {
    return {
        deposit: deposit,
        store: store
    };

    function deposit() {
        return function(selection) {
            selection.each(function() {
                var sel = d3.select(this);
                sel.attr('data-text', sel.text());
            });
        };
    }

    function store() {
        var clone, dropped, dims;
        var drag = d3.behavior.drag()
            .origin(function() {
                return { x: d3.event.pageX, y: d3.event.pageY };
            })
            .on('dragstart', function() {
                clone = d3.select(this.parentNode.insertBefore(this.cloneNode(true), this));
                d3.select(this)
                    .style('position', 'absolute')
                    .style('pointer-events', 'none');
                dims = [this.offsetWidth, this.offsetHeight];
            })
            .on('drag', function() {
                d3.select(this)
                    .style('left', d3.event.x - (dims[0] / 2) + 'px')
                    .style('top', d3.event.y - (dims[1] / 2) + 'px');
            })
            .on('dragend', function() {
                var self = d3.select(this);
                var target = d3.select(d3.event.sourceEvent.target);
                if (target.classed('bucket')) {
                    target
                        .text(self.text())
                        .classed('filled', true);
                    target
                        .append('span')
                        .classed('remove-button', true)
                        .text('×')
                        .on('click', function() {
                            target
                                .text(target.attr('data-text'))
                                .classed('filled', false);
                        });
                    self.remove();
                    clone.call(drag);
                } else {
                    clone.remove();
                    d3.select(this)
                        .style('position', 'auto')
                        .style('pointer-events', '');
                }
            });

        return function(selection) {
            selection.each(function() {
                var sel = d3.select(this).call(drag);
                sel.attr('data-text', sel.text());
            });
        };
    }
}
